import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import 'tailwindcss/tailwind.css';
import Header from "../components/Header";
import RapList from "../components/RapList";
import Timer from "../components/Timer";
import InputToggle from "../components/InputToggle";
import DoughnutChart from "../components/DoughnutChart";
import calculateTimer from "../utils/CalculateTimer";

const IndexPage = () => {
  const webcamRef: React.LegacyRef<Webcam> = useRef(null);
  const [image, setImage] = useState<string>('');
  const [frameID, setFrameID] = useState<number>(0)

  const [isPose, setIsPose] = useState<boolean>(true);
  const [detectIntervalId, setDetectIntervalId] = useState<number>(0);

  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timeArray, setTimeArray] = useState<Array<number | string>>([]);
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [timeIntervalId, setTimeIntervalId] = useState<number>(0);

  const runDetect = () => {
    let intervalId: any = setInterval(async() => {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        const base64 = imageSrc.split(',')[1];
        setFrameID(frameID + 1);

        const res = await fetch('/api/pose', {
          body: JSON.stringify({ image: base64 }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        const data = await res.json();
        setImage(data.image);
      }
    }, 10);

    setDetectIntervalId(intervalId);
  };

  const handlePlayButton = () => {
    if (!isPlay) {
      let intervalId: any = setInterval(() => {
        setTimeInSeconds((previousState: number) => previousState + 1);
      }, 1000);

      setIsPlay(true);
      setTimeIntervalId(intervalId);
    }
  }

  const handleStopButton = () => {
    setIsPlay(false);
    clearInterval(timeIntervalId);
  }

  const handleResetButton = () => {
    setIsPlay(false);
    clearInterval(timeIntervalId);
    setTimeInSeconds(0);
  }

  const handleChange = (flag: boolean): void => {
    setIsPose(flag);

    if (!flag) {
      clearInterval(detectIntervalId);
    } else {
      runDetect();
    }
  }

  useEffect(() => { runDetect() }, []);

  useEffect(() => {
    let timeArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimeArray(timeArray);
  }, [timeInSeconds]);

  return (
    <div className="App bg-gray-800 h-screen overflow-hidden">
      <Header></Header>

      <section className="text-gray-400 pb-12 pt-10 bg-gray-800 body-font h-full">
        <div className="container mx-auto px-5 md:flex-row flex-col">
          <div className="flex">
            <div>
              <div className="flex mb-10">
                <div>Set</div>
                <div>Rep</div>
                <div>Menu</div>
              </div>
              <div
                className="relative"
                style={{
                  width: 640,
                  height: 480,
                }}
              >
                <div>
                  <div
                    className="flex justify-center items-center mt-3"
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      top: 0,
                      left: 30,
                    }}
                  >
                    <div className="bg-gray-200 rounded-lg">
                      <div className="inline-flex rounded-lg">
                        <InputToggle isPose={isPose} name="On" onClick={handleChange} />
                      </div>
                      <div className="inline-flex rounded-lg">
                        <InputToggle isPose={isPose} name="Off" onClick={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                <Webcam
                  ref={webcamRef}
                  style={{
                    position: "absolute",
                    zIndex: 9,
                    width: 640,
                    height: 480,
                  }}
                />

                {isPose ?
                  <img
                    src={image}
                    style={{
                      position: "absolute",
                      zIndex: 9,
                      width: 640,
                      height: 480,
                    }}
                  /> :
                  <img />
                }
              </div>
            </div>

            <div className="ml-20">
              <div className="flex items-center">
                <DoughnutChart
                  maxReps={10}
                  rep={5}
                  maxSet={3}
                  set={1}
                />
                <Timer
                  hours={timeArray[0]}
                  minutes={timeArray[1]}
                  seconds={timeArray[2]}
                  handlePlayButton={handlePlayButton}
                  handleStopButton={handleStopButton}
                  handleResetButton={handleResetButton}
                />
              </div>
              <RapList></RapList>
            </div>
          </div>

        </div>
      </section >
    </div >
  );
}

export default IndexPage;