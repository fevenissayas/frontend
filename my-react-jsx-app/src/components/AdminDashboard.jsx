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
      role: "Teacher",
    },
    {
      id: 2,
      name: "Mr. Vittapu",
      teacherId: "5678",
      email: "vittapu@gmail.com",
      course: "Fundamental of Electrical Circuit",
      role: "Teacher",
    },
  ]);

  const [studentsData, setStudentsData] = useState([
    {
      id: 1,
      name: "John Doe",
      studentId: "9012",
      email: "johndoe@gmail.com",
      course: "Mathematics",
      role: "Student",
    },
  ]);

  const [nextUserId, setNextUserId] = useState(3);
  const [selectedRole, setSelectedRole] = useState("Teacher"); // Default role

  const addNewUser = () => {
    const newUser = {
      id: nextUserId,
      name: "New User",
      [`${selectedRole.toLowerCase()}Id`]: "Enter ID",
      email: "Enter Email",
      course: "Enter Course",
      role: selectedRole,
    };

    if (selectedRole === "Teacher") {
      setTeachersData([...teachersData, newUser]);
    } else if (selectedRole === "Student") {
      setStudentsData([...studentsData, newUser]);
    }

    setNextUserId(nextUserId + 1);
  };

  const updateUserData = (id, field, value, role) => {
    if (role === "Teacher") {
      setTeachersData((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher.id === id ? { ...teacher, [field]: value } : teacher
        )
      );
    } else if (role === "Student") {
      setStudentsData((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, [field]: value } : student
        )
      );
    }
  };

  const deleteUser = (id, role) => {
    if (role === "Teacher") {
      setTeachersData(teachersData.filter((teacher) => teacher.id !== id));
    } else if (role === "Student") {
      setStudentsData(studentsData.filter((student) => student.id !== id));
    }
  };

  const UserRow = ({ user, role }) => (
    <tr>
      <td>{role === "Teacher" ? teachersData.indexOf(user) + 1 : studentsData.indexOf(user) + 1}</td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) =>
          updateUserData(user.id, `${role.toLowerCase()}Id`, e.target.textContent, role)
        }
      >
        {user[`${role.toLowerCase()}Id`]}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateUserData(user.id, "name", e.target.textContent, role)}
      >
        {user.name}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateUserData(user.id, "email", e.target.textContent, role)}
      >
        {user.email}
      </td>
      <td
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateUserData(user.id, "course", e.target.textContent, role)}
      >
        {user.course}
      </td>
      <td>{user.role}</td>
      <td>
        <a
          href="#"
          className="text-primary"
          onClick={(e) => {
            e.preventDefault();
            deleteUser(user.id, role);
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
                <h3 className="card-text">{studentsData.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card mb-4">
        <div className="card-body">
        <div className="d-flex justify-content-between mb-2 align-items-center" style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
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
            <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
              <select
                className="form-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem" }}
              >
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
              <button
                className="btn btn-dark"
                onClick={addNewUser}
                style={{
                  paddingTop: "0.35rem",
                  paddingBottom: "0.35rem",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
              >
                + Add New User
              </button>
            </div>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher) => (
                <UserRow key={teacher.id} user={teacher} role="Teacher" />
              ))}
              {studentsData.map((student) => (
                <UserRow key={student.id} user={student} role="Student" />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;