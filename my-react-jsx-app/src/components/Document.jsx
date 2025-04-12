import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DocumentManager = () => {
  const [chapters, setChapters] = useState([
    { id: 1, title: "Chapter 1", isEditing: false },
  ]);

  // Add a new chapter
  const addNewChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chapter ${chapters.length + 1}`,
      isEditing: false,
    };
    setChapters([...chapters, newChapter]);
  };

  // Remove a chapter
  const removeChapter = (chapterId) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
  };

  // Handle editing chapter title
  const handleEdit = (chapterId, newTitle) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, title: newTitle, isEditing: false } : chapter
      )
    );
  };

  // Handle file upload
  const handleFileUpload = (chapterId, file) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, fileName: file.name } : chapter
      )
    );
  };

  // Render each chapter
  const renderChapter = (chapter) => {
    return (
      <div className="chapter-item mb-3" key={chapter.id}>
        <button className="chapter-button list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-dark text-white border-0 rounded-3">
          <span
            className="chapter-text"
            contentEditable={chapter.isEditing}
            onBlur={(e) => handleEdit(chapter.id, e.target.textContent)}
            suppressContentEditableWarning={true}
          >
            {chapter.title}
          </span>
          <span className="file-name text-muted ms-2">
            {chapter.fileName && `(${chapter.fileName})`}
          </span>
          <span
            className="minus-icon cursor-pointer"
            onClick={() => removeChapter(chapter.id)}
          >
            −
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files && handleFileUpload(chapter.id, e.target.files[0])
            }
          />
        </button>
      </div>
    );
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
        <span className="fs-4">EduWave</span>
      </header>

      <main>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-6 fw-bold">Uploaded Documents</h1>
          <button
            id="addButton"
            className="btn btn-dark rounded-circle"
            aria-label="Add document"
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
          {chapters.map((chapter) => renderChapter(chapter))}
        </div>
      </main>
    </div>
  );
};

export default DocumentManager;