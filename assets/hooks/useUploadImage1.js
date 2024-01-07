// useUploadImage.js
import { useState, useCallback } from "react";

export const useUploadImage1 = (initialImage = "") => {
  const [image1, setImg1] = useState(initialImage);

  const handleUpload1 = useCallback((e, callback) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg1(reader.result);
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
    image1,
    handleUpload1,
    setImg1,
  };
};
