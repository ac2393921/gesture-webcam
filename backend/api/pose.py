import base64

from flask import Blueprint, request, jsonify
import numpy as np

import tensorflow as tf
import numpy as np
import cv2


pose = Blueprint('pose', __name__, url_prefix='/pose')


EDGES = {
    (0, 1): 'm',
    (0, 2): 'c',
    (1, 3): 'm',
    (2, 4): 'c',
    (0, 5): 'm',
    (0, 6): 'c',
    (5, 7): 'm',
    (7, 9): 'm',
    (6, 8): 'c',
    (8, 10): 'c',
    (5, 6): 'y',
    (5, 11): 'm',
    (6, 12): 'c',
    (11, 12): 'y',
    (11, 13): 'm',
    (13, 15): 'm',
    (12, 14): 'c',
    (14, 16): 'c'
}


CONFIDENCE_THRESHOLD = 0.3


def draw_with_keypoints(image, keypoints, edges, confidence_threshold):
    y, x, _ = image.shape
    shaped = np.squeeze(np.multiply(keypoints, [y,x,1]))

    for kp in shaped:
        ky, kx, kp_conf = kp
        if kp_conf > confidence_threshold:
            cv2.circle(image, (int(kx), int(ky)), 4, (0, 255, 0), -1)

    for edge, _ in edges.items():
        p1, p2 = edge
        y1, x1, c1 = shaped[p1]
        y2, x2, c2 = shaped[p2]
        
        if (c1 > confidence_threshold) & (c2 > confidence_threshold):      
            cv2.line(image, (int(x1), int(y1)), (int(x2), int(y2)), (0,0,255), 2)


def base642img(img_base64):
    img_base64 = base64.b64decode(img_base64)

    jpg = np.frombuffer(img_base64,dtype=np.uint8)
    img = cv2.imdecode(jpg, cv2.IMREAD_COLOR)

    return img


def img2base64(img):
    _, dst_data = cv2.imencode('.png', img)
    img_base64 = base64.b64encode(dst_data).decode('utf-8')

    return img_base64


def detect_keypoints(img):
    interpreter = tf.lite.Interpreter(model_path="lite-model_movenet_singlepose_lightning_3.tflite")
    interpreter.allocate_tensors()

    img = tf.image.resize_with_pad(np.expand_dims(img, axis=0), 192,192)
    input_image = tf.cast(img, dtype=tf.float32)

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], np.array(input_image))
    interpreter.invoke()
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])

    return keypoints_with_scores


@pose.route('/detect', methods=['POST'])
def detect():
    img = base642img(request.json['image'].encode())
    keypoints_with_scores = detect_keypoints(img.copy())
    draw_with_keypoints(img, keypoints_with_scores, EDGES, CONFIDENCE_THRESHOLD)
    new_img_base64 = img2base64(img)

    return {'response': 201, 'isRap': True, 'image': "data:image/png;base64,"+new_img_base64}