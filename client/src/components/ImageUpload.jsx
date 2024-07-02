// src/components/ImageUpload.js
import React, { useState } from "react";
import axios from "axios";




const CLOUDINARY_URL =
  "cloudinary://165675972552178:wMiA--GCKSaO-4JrAPKI1mZeDoU";
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_URL); // Thay thế bằng upload preset của bạn

    axios
      .post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress);
          },
        }
      )
      .then((response) => {
        setUrl(response.data.secure_url);
        console.log("File available at", response.data.secure_url); // Bạn có thể lưu link này vào cơ sở dữ liệu hoặc sử dụng nó theo ý muốn
      })
      .catch((error) => {
        console.error("Error uploading image to Cloudinary", error);
      });
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url && <img src={url} alt="Uploaded image" />}
    </div>
  );
};

export default ImageUpload;
