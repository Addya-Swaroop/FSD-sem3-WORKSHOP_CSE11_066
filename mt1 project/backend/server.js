const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Demo login
const user = {
  email: "admin@gmail.com",
  password: "1234",
};

// Student data
let students = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    course: "B.Tech CSE",
    year: "2nd Year",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@gmail.com",
    course: "B.Tech CSE",
    year: "2nd Year",
  },
  {
    id: 3,
    name: "Arjun Verma",
    email: "arjun@gmail.com",
    course: "B.Tech IT",
    year: "1st Year",
  },
];

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    res.json({
      success: true,
      message: "Login successful",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

// GET ALL STUDENTS
app.get("/students", (req, res) => {
  res.json(students);
});

// ADD STUDENT
app.post("/students", (req, res) => {
  const { name, email, course, year } = req.body;

  if (!name || !email || !course || !year) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    email,
    course,
    year,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent,
  });
});

// UPDATE STUDENT
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentIndex = students.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, email, course, year } = req.body;

  students[studentIndex] = {
    id,
    name,
    email,
    course,
    year,
  };

  res.json({
    message: "Student updated successfully",
    student: students[studentIndex],
  });
});

// DELETE STUDENT
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const studentExists = students.some(
    (student) => student.id === id
  );

  if (!studentExists) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  students = students.filter((student) => student.id !== id);

  res.json({
    message: "Student deleted successfully",
  });
});

app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});