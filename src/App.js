import React, { useState } from "react";
import "./App.css";
import FileUpload from "./FileUpload/file-upload.component";
// import { Collage } from "./CollageComponent";

function App() {
  // return <Collage />;
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
}

export default App;
