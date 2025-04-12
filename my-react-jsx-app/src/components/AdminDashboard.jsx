import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminDashboard = () => {
  const [teachersData, setTeachersData] = useState([
    {
      id: 1,
      name: "Mr. Betsegaw",
      teacherId: "1234",
      email: "betsegaw@gmail.com",
      course: "Website Development",
    },
    {
      id: 2,
      name: "Mr. Vittapu",
      teacherId: "5678",
      email: "vittapu@gmail.com",
      course: "Fundamental of Electrical Circuit",
    },
  ]);
  const [studentsCount] = useState(200);
  const [nextTeacherId, setNextTeacherId] = useState(3);

  const addNewTeacher = () => {
    const newTeacher = {
      id: nextTeacherId,
      name: "New Teacher",
      teacherId: "Enter ID",
      email: "Enter Email",
      course: "Enter Course",
    };
    setTeachersData([...teachersData, newTeacher]);
    setNextTeacherId(nextTeacherId + 1);
  };

  const updateTeacherData = (id, field, value) => {
    setTeachersData((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === id ? { ...teacher, [field]: value } : teacher
      )
    );
  };

  const deleteTeacher = (id) => {
    setTeachersData(teachersData.filter((teacher) => teacher.id !== id));
  };

  const TeacherRow = ({ teacher }) => (
    <tr>
      <td>{teachersData.indexOf(teacher) + 1}</td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateTeacherData(teacher.id, "teacherId", e.target.textContent)}
      >
        {teacher.teacherId}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateTeacherData(teacher.id, "name", e.target.textContent)}
      >
        {teacher.name}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateTeacherData(teacher.id, "email", e.target.textContent)}
      >
        {teacher.email}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateTeacherData(teacher.id, "course", e.target.textContent)}
      >
        {teacher.course}
      </td>
      <td>
        <a
          href="#"
          className="text-primary"
          onClick={(e) => {
            e.preventDefault();
            deleteTeacher(teacher.id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );

  return (
    <div className="container py-4">
      {/* Logo and Header */}
      <div className="row align-items-center mb-4">
        <div className="col d-flex justify-content-start align-items-center">
          <a
            className="navbar-brand d-flex flex-column align-items-center"
            href="index.html"
            style={{ textAlign: "center", margin: 0 }}
          >
            <img
              className="mb-0"
              src="/src/assets/images/image 2.png"
              alt="HospitALL Logo"
            />
            <span className="fs-6 my-0">HospitALL</span>
          </a>
        </div>
        <div className="col text-end">
          <h3 className="fw-bold mb-0">Admin Dashboard</h3>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-person-fill display-6 me-3"></i>
              <div>
                <h5 className="card-title">Total Teachers</h5>
                <h3 className="card-text">{teachersData.length}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex align-items-center">
              <i className="bi bi-mortarboard-fill display-6 me-3"></i>
              <div>
                <h5 className="card-title">Total Students</h5>
                <h3 className="card-text">{studentsCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card for Tabs and Table */}
      <div className="card mb-4">
        <div className="card-body">
          {/* Tabs for Teachers and Students */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#teachers"
                data-bs-toggle="tab"
              >
                Teachers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#students" data-bs-toggle="tab">
                Students
              </a>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Teachers Tab */}
            <div className="tab-pane fade show active" id="teachers">
              <div className="d-flex justify-content-between mb-3">
                <div className="input-group w-50">
                  <span className="input-group-text" id="search-icon">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
                <button className="btn btn-dark" onClick={addNewTeacher}>
                  + Add New Teacher
                </button>
              </div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachersData.map((teacher) => (
                    <TeacherRow key={teacher.id} teacher={teacher} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Students Tab */}
            <div className="tab-pane fade" id="students">
              <p>Students tab content goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;