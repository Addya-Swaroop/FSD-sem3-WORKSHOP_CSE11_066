import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully!");

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running on port 3000");
    });
})
.catch((error) => {
    console.log("MongoDB Connection Failed:", error.message);
});
pp.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to Express Server" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
app.post("/test", async (req, res) )=> {
  try{
    const student = await Student.create({
      name:"Rahul Sharma",
      email:"rahul@gmail.com",
      course:"MERN stack"
    });
    res.status(201).json({
      message: "Student created successfully",
      data:student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
app.get("/test-db", async (req, res)) => {
  try{
    const students = await Student.find();
    res.status(200).json({
      message: "Students retrieved successfully",
      data:students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});