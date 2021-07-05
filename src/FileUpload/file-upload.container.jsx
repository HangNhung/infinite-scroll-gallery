import React, { useState } from "react";
import FileUpload from "./file-upload.component";
import axios from "axios";

const FileUploadContainer = () => {
  const [images, setImages] = useState([]);

  const upadteUploadedFiles = (files) => {
    setImages(files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle upload images
    let formData = new FormData();
    // console.log("images", images);
    for (let image of images) {
      formData.append("image", image);
      formData.append("name", image.name);
    }

    // return url image in azure container
    axios({
      url: "https://lk-backend-dev.azurewebsites.net/api/blobs/uploadimg",
      method: "POST",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYW1pbHlfbmFtZSI6InNwVXNlciIsIm5hbWVpZCI6IjEyIiwiZW1haWwiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgVXNlciIsImp0aSI6ImQ2YzhkMDNhLWRjYzQtNGNmNC1iNjNmLTM1MmQ2ZTAyZmY1MSIsImV4cCI6MTYyNTUxNzI2MiwiaXNzIjoid3d3LmxlbmdrZW5nLmFzaWEiLCJhdWQiOiJ3d3cubGVuZ2tlbmcuYXNpYSJ9.suQ7-YCG6-s8kJAEkfS9RRvb_Tm2QqLH6BKBI_0oIfY",
      },
      data: formData,
    }).then(
      (res) => {
        // res.data {key: value}
        // save link into database
        const imagesArr = res.data;
        let requestBody = [];
        for (let [index, item] of imagesArr.entries()) {
          const imageData = {
            id: 0,
            billboardId: 80,
            url: item.value,
            typeName: "Detail",
            order: index + 1,
            lastUpdated: new Date(),
          };
          requestBody.push(imageData);
        }
        axios({
          url: "https://lk-backend-dev.azurewebsites.net/api/Billboard/display",
          method: "POST",
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYW1pbHlfbmFtZSI6InNwVXNlciIsIm5hbWVpZCI6IjEyIiwiZW1haWwiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgVXNlciIsImp0aSI6ImQ2YzhkMDNhLWRjYzQtNGNmNC1iNjNmLTM1MmQ2ZTAyZmY1MSIsImV4cCI6MTYyNTUxNzI2MiwiaXNzIjoid3d3LmxlbmdrZW5nLmFzaWEiLCJhdWQiOiJ3d3cubGVuZ2tlbmcuYXNpYSJ9.suQ7-YCG6-s8kJAEkfS9RRvb_Tm2QqLH6BKBI_0oIfY",
          },
          data: requestBody,
        }).then(
          (res) => {
            console.log("res upload image", res);
          },
          (err) => {
            console.error(" upload image", err);
          }
        );
      },
      (err) => {
        console.error("err", err);
      }
    );
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
