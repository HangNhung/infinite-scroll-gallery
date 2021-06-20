import React, { useRef, useState } from "react";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./file-upload.styles";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKb = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const convertNestedObjectArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

  const callUpdateFileCb = (files) => {
    const filesAsArray = convertNestedObjectArray(files);
    updateFilesCb(filesAsArray);
  };

  // returns an object where the key is the file name and the value is the File object
  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);

      // any changes to the files state must be sent to the parent component
      callUpdateFileCb(updateFilesCb);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFileCb({ ...files });
  };

  // drap and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files: newFiles } = e.dataTransfer;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);

      // any changes to the files state must be sent to the parent component
      callUpdateFileCb(updateFilesCb);
    }
  };

  // drag and drop images
  const startDragging = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = (index) => {
    let arrFiles = [];
    for (let file of Object.entries(files)) {
      arrFiles.push(file);
    }
    const draggedOverItem = arrFiles[draggedItem];
    // if the item is dragged over itself, ignore
    if (index === draggedItem) {
      return;
    }
    const items = arrFiles.filter((item) => item !== draggedOverItem);
    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedOverItem);
    setFiles(Object.fromEntries(items));
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <>
      <FileUploadContainer
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload"></i>
          <span>Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>

      {/*second part starts here*/}
      <FilePreviewContainer>
        <span>To Upload</span>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <PreviewContainer key={fileName}>
                <div
                  draggable="true"
                  onDragStart={(e) => startDragging(e, index)}
                  onDragOver={() => onDragOver(index)}
                  onDragEnd={onDragEnd}
                >
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKb(file.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(fileName)}
                      ></RemoveFileIcon>
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default FileUpload;
