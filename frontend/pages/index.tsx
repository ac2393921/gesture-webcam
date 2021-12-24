import { image } from "@tensorflow/tfjs-core";
import useSWR from 'swr';
import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import 'tailwindcss/tailwind.css';

const IndexPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const test = () => {
    console.log('test1');
    const res = fetch('/api/pose', {
      body: JSON.stringify({
        email: 'aaa',
        message: 'bbb'
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(function(json) {
      console.log(json)
    })
    console.log(res);
    console.log('test2');
  }

  const runDetect = async () => {
    setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      const formData = new FormData()
      formData.append('image', imageSrc)

      const res = fetch('/api/pose', {
        body: JSON.stringify({
          email: 'aaa',
          message: 'bbb'
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      // const data = fetch('/api/pose', imageSrc);
      // const response = await fetch('/api/pose');
      // detect(imageSrc);
    }, 10);
  };

  // const detect = (image) => {
  //   const formData = new FormData()
  //   formData.append('image', image)

  //   const apiRes = fetch("http://localhost:5000/pose/detect", {
  //       method: 'POST',
  //       headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: formData
  //   }).then(response => {
  //     if (!response.ok) {
  //       console.error('サーバーエラー');
  //     }
  //     // ここに成功時の処理を記述
  //   })
  //   .catch(error => {
  //     console.error('通信に失敗しました', error);
  //   });

  //   console.log(apiRes);
  // }

  // const runPosenet = async () => {
  //   const net = await posenet.load();
  //   //
  //   setInterval(() => {
  //     detect(net);
  //   }, 100);
  // };

  // const detect = async (net) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Make Detections
  //     const pose = await net.estimateSinglePose(video);
  //     console.log(pose);

  //     drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
  //   }
  // };

  // const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
  //   const ctx = canvas.current.getContext("2d");
  //   canvas.current.width = videoWidth;
  //   canvas.current.height = videoHeight;

  //   drawKeypoints(pose["keypoints"], 0.6, ctx);
  //   drawSkeleton(pose["keypoints"], 0.7, ctx);
  // };

  // const detect = async (net) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     const imageSrc = webcamRef.current?.getScreenshot();
  //     // console.log(imageSrc)

  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     const face = await net.estimateFaces({ input: video });

  //     // const ctx = canvasRef.current.getContext("2d");
  //     // requestAnimationFrame(() => { drawMesh(face, ctx) });
  //   }
  // };

  // useEffect(() => { runDetect() }, []);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <div>
          <div style={{
                position: "relative",
                zIndex: 9,
                width: 640,
                height: 480,
                marginBottom: 20
              }}>
            <Webcam
              ref={webcamRef}
              style={{
                position: "absolute",
                marginLeft: 20,
                // marginRight: "auto",
                marginTop: 20,
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: 9,
                width: 640,
                height: 480,
              }}
            />

            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: 20,
                // marginRight: "auto",
                marginTop: 20,
                left: 0,
                right: 0,
                textAlign: "center",
                zIndex: 9,
                width: 640,
                height: 480,
              }}
            />
          </div>

          <div>
            <button onClick={test}>Start</button>
            <button>Stop</button>
            <button>Reset</button>
          </div>
        </div>

        <div>
          aaaa
        </div>
      </div>
    </div>
  );
}

export default IndexPage;