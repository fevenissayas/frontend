import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const coursesData = [
  {
    title: "Website Development",
    chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
    notes: [
      { title: "How to Work on HTML", description: "Write your HTML code in a .html file and open it in a browser." },
      { title: "How to Work on CSS", description: "Link your .css file to your HTML and style your webpage." },
    ],
  },
  {
    title: "JavaScript Basics",
    chapters: ["Introduction", "Variables", "Functions", "DOM Manipulation"],
    notes: [
      { title: "Working with Variables", description: "Learn how to declare and use variables in JavaScript." },
      { title: "DOM Manipulation", description: "Learn how to modify HTML elements dynamically." },
    ],
  },
];

const Detail = () => {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [courses, setCourses] = useState(coursesData);

  const currentCourse = courses[currentCourseIndex];

  const addNote = () => {
    const newNoteTitle = prompt("Enter the note title:");
    const newNoteDescription = prompt("Enter the note description:");
    if (newNoteTitle && newNoteDescription) {
      const updatedCourses = [...courses];
      updatedCourses[currentCourseIndex].notes.push({
        title: newNoteTitle,
        description: newNoteDescription,
      });
      setCourses(updatedCourses);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-6 bg-dark text-white vh-100 p-4">
          <img src="/src/assets/images/image 1.png" className="img-fluid w-10" style={{ width: "80px" }} alt="Logo" />
          <h1 className="fs-3 mb-4">EduWave</h1>
          <h2 id="course-title" className="fs-4 mb-4">
            Course Title: {currentCourse.title}
          </h2>
          <div id="chapters">
            {currentCourse.chapters.map((chapter, index) => (
              <button key={index} className="btn btn-light text-start w-100 mb-2">
                {chapter}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="col-md-6 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-3">Notes</h2>
            <button className="btn btn-dark rounded-circle" style={{ width: "50px", height: "50px" }} onClick={addNote}>
              +
            </button>
          </div>
          <div id="notes" className="row g-3">
            {currentCourse.notes.map((note, index) => (
              <div className="col-md-6" key={index}>
                <div className="card note-card">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;