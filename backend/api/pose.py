from flask import Blueprint, request

pose = Blueprint('pose', __name__, url_prefix='/pose')

@pose.route('/detect', methods=['POST'])
def detect():
    img = request.form.get('image')
    print(img)
    return {'response': 200}