import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const applyFormatting = (format) => {
    document.execCommand(format, false, null);
  };

  const handleContentChange = (e) => {
    setContent(e.target.innerHTML);
  };

  return (
    <div className="container py-4">
      <a href="/detail" className="text-decoration-none text-dark fs-4 d-inline-block mb-4" id="backButton">
        ←
      </a>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="bg-white p-4 rounded shadow-sm">
            <input
              type="text"
              className="form-control form-control-lg border-0 px-0 fs-2 fw-bold mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <hr className="border-2 opacity-75" />

            <div className="btn-group mb-2" role="group" aria-label="Formatting options">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => applyFormatting("bold")}
              >
                <i className="bi bi-type-bold"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => applyFormatting("italic")}
              >
                <i className="bi bi-type-italic"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => applyFormatting("underline")}
              >
                <i className="bi bi-type-underline"></i>
              </button>
            </div>

            <div
              id="noteInput"
              className="form-control border-0 px-0 lh-lg"
              contentEditable="true"
              onInput={handleContentChange}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;