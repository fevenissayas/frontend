import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const coursesData = [
  {
    id: "1",
    title: "Fundamental Of Electrical Circuit",
    publishedBy: "Mr. Vittapu",
    href: "#electrical-circuit",
  },
  {
    id: "2",
    title: "Fundamental Of Software Engineering",
    publishedBy: "Mr. Vittapu",
    href: "#software-engineering",
  },
  {
    id: "3",
    title: "Human Computer Interaction",
    publishedBy: "Mr. Mittapu",
    href: "#human-computer-interaction",
  },
  {
    id: "4",
    title: "Computer Architecture and Organization",
    publishedBy: "Mr. Abebe",
    href: "#computer-architecture",
  },
  {
    id: "5",
    title: "Website Development",
    publishedBy: "Mr. Betsegaw",
    href: "#website-development",
  },
];

const Courses = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="index.html">
            <img className="me-2 w-40" src="src/assets/images/image 2.png" alt="EduWave Logo" />
            <span className="fs-2">EduWave</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ms-3 me-5">
                <a className="nav-link fw-semibold" href="login.html">Login</a>
              </li>
              <li className="nav-item ms-3 me-5">
                <a className="nav-link fw-semibold" href="courses.html">Courses</a>
              </li>
              <li className="nav-item ms-3 me-5">
                <a className="nav-link fw-semibold" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        <h1 className="display-4 mb-4">Courses</h1>
        <p className="lead mb-5">
          EduWave offers a rich collection of notes and presentations from teachers, covering various subjects like Mathematics, Science, Art, and more. With interactive lessons and resources, it's designed to help students learn, grow, and excel at their own pace.
        </p>

        {/* Course Grid */}
        <div className="row g-4">
          {coursesData.map((course) => (
            <div className="col-md-6" key={course.id}>
              <a href={course.href} className="text-decoration-none">
                <div className="card bg-dark text-white h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text mt-auto text-end">Published by {course.publishedBy}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;