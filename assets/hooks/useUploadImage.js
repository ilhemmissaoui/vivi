// useUploadImage.js
import { useState, useCallback } from "react";

export const useUploadImage = (initialImage = "") => {
  const [image, setImg] = useState(initialImage);

  const handleUpload = useCallback((e, callback) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result);
      // Call the callback function if provided
      if (callback && typeof callback === "function") {
        callback(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  return {
    image,
    handleUpload,
    setImg,
  };
};
