import { useState, useRef } from "react";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const ObjectDetect = () => {
  const [selectImage, setSelectImage] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const imageRef = useRef();

  const runCoco = async () => {
    if (imageRef.current && selectImage) {
      const model = await cocoSsd.load();
      const results = await model.detect(imageRef.current);
      const objectsInPicture = results
        .map(object => object.class);
      setDetectedObjects(objectsInPicture);
    }
  };

  const handleImageLoad = () => {
    runCoco();
  };

  const handleFileChange = (e) => {
    setSelectImage(e.target.files[0]);
    setDetectedObjects([]); // Clear the previous results when a new image is selected
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
      <h1>Objects detected:</h1>
      {detectedObjects.length > 0 && (
        <ul>
          {detectedObjects.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ObjectDetect;
