import { useState, useRef } from "react";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const ObjectDetect = () => {
  const [selectImage, setSelectImage] = useState(null);
  const imageRef = useRef();
  const inPicture = [];

  const runCoco = async () => {
    if (imageRef.current && selectImage) {
      const model = await cocoSsd.load();
      const results = await model.detect(imageRef.current);
      results.forEach((object) => {
        if (object.score > 0.6)
        inPicture.push(object.class)}
      );
      console.log(inPicture);
    }
  };

  const handleImageLoad = () => {
    runCoco();
  };

  const handleFileChange = (e) => {
    setSelectImage(e.target.files[0]);
  };

  return (
    <>
      <input
        type="file"
        name="upload"
        accept="image/*"
        onChange={handleFileChange}
      />
      {selectImage && (
        <img
          ref={imageRef}
          src={URL.createObjectURL(selectImage)}
          alt="Uploaded"
          width={"250px"}
          onLoad={handleImageLoad}
        />
      )}
    </>
  );
};

export default ObjectDetect;
