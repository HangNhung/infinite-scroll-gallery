import React, { useState } from "react";
import FileUpload from "./file-upload.component";
import { storage } from "../config";
const FileUploadContainer = () => {
  const [images, setImages] = useState(null);

  const upadteUploadedFiles = (files) => {
    setImages(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle upload images
    const promises = [];
    for (let image of images) {
      // the return value will be a Promise
      const uploadTask = storage.ref().child(`cat/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress));
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
          });
        }
      );
    }
    Promise.all(promises)
      .then(() => {
        alert("upload hình thành công");
      })
      .catch(() => {
        alert("upload hình bị lỗi");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileUpload
          accept=".jpg,.png,jpeg"
          label="Collection Image(s)"
          multiple
          updateFilesCb={upadteUploadedFiles}
        ></FileUpload>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadContainer;
