import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DocumentManager = () => {
  const [chapters, setChapters] = useState([{ id: 1, title: "Chapter 1" }]);

  const addNewChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chapter ${chapters.length + 1}`,
    };
    setChapters([...chapters, newChapter]);
  };

  const removeChapter = (chapterId) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
  };

  const handleFileUpload = (chapterId, file) => {
    console.log(`Uploading file "${file.name}" for chapter ${chapterId}`);
  };

  const triggerFileUpload = (chapterId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx,.txt";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) handleFileUpload(chapterId, file);
    };
    fileInput.click();
  };

  return (
    <div className="container py-5">
      <header className="d-flex align-items-center mb-4">
        <img
          src="/src/assets/images/image 2.png"
          className="img-fluid"
          style={{ width: "80px" }}
          alt="Logo"
        />
        <span className="fs-4">HospitALL</span>
      </header>

      <main>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6 fw-bold">Uploaded Documents</h1>
          <button
            id="addButton"
            className="btn btn-dark rounded-circle"
            onClick={addNewChapter}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        <div id="chaptersContainer" className="list-group">
          {chapters.map((chapter) => (
            <div className="chapter-item mb-3" key={chapter.id}>
              <button
                className="chapter-button list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-dark text-white border-0 rounded-3"
                onClick={() => triggerFileUpload(chapter.id)}
              >
                <span className="chapter-text">{chapter.title}</span>
                <span
                  className="minus-icon cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChapter(chapter.id);
                  }}
                >
                  −
                </span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DocumentManager;