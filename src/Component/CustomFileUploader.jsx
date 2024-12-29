import React, { useState } from "react";

export const CustomFileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    setFiles([...files, ...event.dataTransfer.files]);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
  };

  console.log("Files Data is ------>", files);

  return (
    <>
      <div
        style={{
          ...styles.container,
          ...(files.length > 0 ? styles.containerHover : {}),
        }}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
      >
        <h5 style={{ margin: 0 }}>Drag & Drop Files Here</h5>
        <h4>OR</h4>

        <label htmlFor="file-input" style={styles.fileInputLabel}>
          Select File...
        </label>
        <input
          id="file-input"
          type="file"
          multiple
          style={styles.fileInput}
          onChange={handleFileSelect}
        />
      </div>

      <ul style={styles.fileList}>
        {files.length > 0 &&
          files.map((file, index) => (
            <li key={index} style={styles.fileItem}>
              <span style={styles.fileName}>{file.name}</span>
              {file.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={styles.fileImage}
                />
              )}
              <button
                onClick={() =>
                  setFiles((pre) => pre.filter((_, i) => i !== index))
                }
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "4px dashed white",
    flexDirection: "column",
    borderRadius: "12px",
    padding: "40px",
    width: "300px",
    height: "120px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    transition: "border-color 0.3s ease",
  },
  containerHover: {
    borderColor: "#0288d1",
  },
  fileList: {
    listStyleType: "none",
    padding: "20px",
    margin: 0,
    maxWidth: "350px",
  },
  fileItem: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #cfd8dc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  fileName: {
    fontSize: "14px",
    color: "#37474f",
    flex: 1,
    whiteSpace: "nowrap", // Prevent text from wrapping
    overflow: "hidden", // Hide overflow text
    textOverflow: "ellipsis", // Add ellipsis if text is too long
  },
  fileImage: {
    width: "60px",
    height: "60px",
    borderRadius: "6px",
    objectFit: "cover",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  fileInput: {
    display: "none", // Hide the default file input
  },
  fileInputLabel: {
    backgroundColor: "#0288d1",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
