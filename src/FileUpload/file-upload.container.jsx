import React, { useState } from "react";
import FileUpload from "./file-upload.component";

const FileUploadContainer = () => {
  const [newCollection, setNewCollection] = useState({
    collectionImages: [],
  });

  const upadteUploadedFiles = (files) => {
    setNewCollection({ ...newCollection, collectionImages: files });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        <button type="submit">Create New Collection</button>
      </form>
    </div>
  );
};

export default FileUploadContainer;
