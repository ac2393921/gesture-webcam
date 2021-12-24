import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import 'tailwindcss/tailwind.css';
import Header from "../components/Header";
import RapList from "../components/RapList";

const IndexPage = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const runDetect = async () => {
    setInterval(async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const base64 = imageSrc.split(',')[1];

        const res = await fetch('/api/pose', {
          body: JSON.stringify({ image: base64 }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
        const data = await res.json();
        setImage(data.image);
      }
    }, 1000);
  };

  useEffect(() => { runDetect() }, []);

  return (
    <div className="App">
      <Header></Header>

      <section className="text-gray-400 bg-gray-800 body-font">
        <div className="container mx-auto flex px-1 pb-20 pt-14 md:flex-row flex-col items-center">
          <div className="relative" style={{
            width: 640,
            height: 480,
          }}>
            <Webcam
              ref={webcamRef}
              style={{
                position: "absolute",
                zIndex: 9,
                width: 640,
                height: 480,
              }}
            />
            <img
              src={image}
              style={{
                position: "absolute",
                zIndex: 9,
                width: 640,
                height: 480,
              }}
            />
          </div>

          <RapList></RapList>
        </div>
      </section>
    </div>
  );
}

export default IndexPage;