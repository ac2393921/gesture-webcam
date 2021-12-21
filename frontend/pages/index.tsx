import React, { useRef, useEffect } from "react";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import { drawMesh } from "../utils/utiles";

const IndexPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({ input: video });

      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => { drawMesh(face, ctx) });
    }
  };

  // useEffect(() => { runFacemesh() }, []);

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
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
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}

export default IndexPage;