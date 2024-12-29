// src/FileUpload.js
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function FileUpload() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) =>
      prevFiles.concat(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file), // Generate preview URL
          })
        )
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Cleanup function to revoke preview URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #007bff",
          padding: "20px",
          borderRadius: "5px",
          color: "#007bff",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>

      {/* Display the uploaded files */}
      <div>
        {files.length > 0 && (
          <div>
            <h3>Uploaded Files:</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {files.map((file, index) => (
                <li
                  key={index}
                  style={{ marginBottom: "10px", textAlign: "left" }}
                >
                  <p>
                    <strong>File Name:</strong> {file.name}
                  </p>
                  {file.type.startsWith("image") && (
                    <img
                      src={file.preview}
                      alt={file.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
