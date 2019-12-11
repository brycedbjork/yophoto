import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

const CountDown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  width: 100%;
  height: 100%;
  font-size: 48px;
  color: white;
  font-weight: 600;
`;

const Flash = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const HiddenCam = styled.div`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const App: React.FC = () => {
  // whether or not the experience is activated
  const [active, setActive] = useState(false);

  // whether or not the screen is showing a (pretend) flash
  const [flash, setFlash] = useState(false);

  // countdown number var
  const [countdown, setCountdown] = useState(0);

  // variable used to conserve memory
  const [backnforth, setBacknforth] = useState(0);

  // variable dictating whether an image should be shown and what image that should be
  const [show, setShow] = useState(null as null | string);

  // strings holding image data
  const [before0, setBefore0] = useState(null);
  const [before1, setBefore1] = useState(null);
  const [after0, setAfter0] = useState(null);
  const [after1, setAfter1] = useState(null);

  const webcamRef = useRef(null);

  // function used to capture an image
  const capture = React.useCallback(
    (name: string) => {
      const camRef = webcamRef as any;
      const imageData = camRef.current.getScreenshot();
      switch (name) {
        case "before0":
          setBefore0(imageData);
          break;
        case "before1":
          setBefore1(imageData);
          break;
        case "after0":
          setAfter0(imageData);
          break;
        case "after1":
          setAfter1(imageData);
          break;
      }
    },
    [webcamRef]
  );

  const run = () => {
    setActive(true);
    if (countdown != 0) return;

    // commence countdown
    setCountdown(3);
    setTimeout(() => {
      setCountdown(2);
      setTimeout(() => {
        setCountdown(1);
        // capture image on 1
        capture(`before${backnforth}`);
        setTimeout(() => {
          // flash "camera"
          setFlash(true);
          setShow(`before${backnforth ? 0 : 1}`);
          setCountdown(0);
          setTimeout(() => {
            setFlash(false);
            // surprise! here's the last "before" photo that was captured
            setTimeout(() => {
              capture(`after${backnforth}`);
              setShow(`after${backnforth ? 0 : 1}`);
              setTimeout(() => {
                // done with experience, reset
                setShow(null);
                setCountdown(0);
                setActive(false);
                // toggle back and forth state variable (used to show previous images without running out of memory)
                setBacknforth(backnforth ? 0 : 1);
              }, 2000);
            }, 2000);
          }, 100);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  let imageData = null;
  switch (show) {
    case "before0":
      imageData = before0;
      break;
    case "before1":
      imageData = before1;
      break;
    case "after0":
      imageData = after0;
      break;
    case "after1":
      imageData = after1;
      break;
  }

  return (
    <React.Fragment>
      <HiddenCam>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            height: 720,
            width: 1280,
            facingMode: "user"
          }}
        />
      </HiddenCam>

      {countdown > 0 && <CountDown>{countdown}</CountDown>}
      {!active && (
        <CountDown
          onClick={() => {
            if (!active) run();
          }}
        >
          Say Cheese
        </CountDown>
      )}
      {imageData && <Image src={imageData as string} />}
      {flash && <Flash />}
    </React.Fragment>
  );
};

export default App;
