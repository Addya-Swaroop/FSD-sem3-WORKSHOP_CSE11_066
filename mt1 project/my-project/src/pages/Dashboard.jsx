import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [students, setStudents] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
  });

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.log("Error fetching students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddForm = () => {
    setEditingStudent(null);

    setFormData({
      name: "",
      email: "",
      course: "",
      year: "",
    });

    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditingStudent(student);

    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      year: student.year,
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingStudent) {
      await fetch(
        `http://localhost:5000/students/${editingStudent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    } else {
      await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }

    setShowForm(false);

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/students/${id}`, {
      method: "DELETE",
    });

    fetchStudents();
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <div className="topbar">

          <div>
            <p className="top-small">OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>

          <div className="profile">
            <div className="avatar">A</div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>

        </div>

        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon">♙</div>
            <div>
              <span>Total Students</span>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Active Students</span>
              <h2>{students.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">⌘</div>
            <div>
              <span>Courses</span>
              <h2>
                {new Set(students.map((student) => student.course)).size}
              </h2>
            </div>
          </div>

        </section>

        <section className="student-section">

          <div className="section-header">

            <div>
              <p className="top-small">STUDENT RECORDS</p>
              <h2>Students</h2>
            </div>

            <button className="add-button" onClick={openAddForm}>
              + Add Student
            </button>

          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>STUDENT</th>
                  <th>EMAIL</th>
                  <th>COURSE</th>
                  <th>YEAR</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {students.map((student) => (

                  <tr key={student.id}>

                    <td>
                      <span className="student-id">
                        #{String(student.id).padStart(3, "0")}
                      </span>
                    </td>

                    <td>
                      <div className="student-name">
                        <div className="table-avatar">
                          {student.name.charAt(0)}
                        </div>

                        <strong>{student.name}</strong>
                      </div>
                    </td>

                    <td>{student.email}</td>

                    <td>
                      <span className="course-tag">
                        {student.course}
                      </span>
                    </td>

                    <td>{student.year}</td>

                    <td>

                      <div className="actions">

                        <button
                          className="edit-btn"
                          onClick={() => openEditForm(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteStudent(student.id)}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {showForm && (

        <div className="modal-background">

          <div className="modal">

            <div className="modal-header">

              <div>
                <p className="top-small">
                  {editingStudent ? "UPDATE RECORD" : "NEW RECORD"}
                </p>

                <h2>
                  {editingStudent
                    ? "Edit Student"
                    : "Add Student"}
                </h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>Student Name</label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />

              <label>Course</label>

              <input
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech CSE"
                required
              />

              <label>Year</label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>

              <button className="save-button" type="submit">
                {editingStudent
                  ? "Update Student"
                  : "Add Student"}
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;