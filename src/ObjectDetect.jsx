import { useEffect, useRef } from "react";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

const ObjectDetect = () => {
  const canvasRef = useRef(null);
  const webcamRef = useRef(null);

  const runCoco = async () => {
    const net = await cocoSsd.load();

    setInterval(() => {
      detect(net);
    }, 10);
  };

  const drawRect = (obj, ctx) => {
    obj.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      const text = prediction.class;

      // Draw bounding box
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.stroke();
      ctx.fillText(text, x, y - 5);
    });
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

      const obj = await net.detect(video);
      console.log(obj);

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        muted={true}
        width="720"
        height="600"
      ></Webcam>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 80, left: 400 }}
      ></canvas>
    </div>
  );
};

export default ObjectDetect;