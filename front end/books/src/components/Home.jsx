import React from "react";
import "./Home.css";

import heroImg from "../assets/hero.png";
import herImg from "../assets/imgbg.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

// 👇 Paste the array HERE
const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image: img1,
    genre: "Self Help",
    rating: "⭐⭐⭐⭐⭐",
    price: "₹499",
    description:
      "A practical guide to building good habits and breaking bad ones."
  },

  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: img2,
    genre: "Fiction",
    rating: "⭐⭐⭐⭐☆",
    price: "₹399",
    description:
      "A young shepherd follows his dream in search of a hidden treasure."
  },

  {
    id: 3,
    title: "Ikigai",
    author: "Héctor García",
    image: img3,
    genre: "Lifestyle",
    rating: "⭐⭐⭐⭐⭐",
    price: "₹450",
    description:
      "Discover the Japanese philosophy for living a long and meaningful life."
  },

  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: img4,
    genre: "Finance",
    rating: "⭐⭐⭐⭐☆",
    price: "₹550",
    description:
      "Learn timeless lessons about money, investing, and financial freedom."
  },

  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image: heroImg,
    genre: "Finance",
    rating: "⭐⭐⭐⭐⭐",
    price: "₹599",
    description:
      "Understand how emotions and behavior influence financial decisions."
  },

  {
    id: 6,
    title: "Think Like a Monk",
    author: "Jay Shetty",
    image: herImg,
    genre: "Self Growth",
    rating: "⭐⭐⭐⭐☆",
    price: "₹520",
    description:
      "Train your mind to find peace, purpose, and clarity in everyday life."
  }
];

const Home = () => {
  return (
    <section className="home">
      <h1>Book Gallery</h1>

      <div className="gallery">
        {books.map((book) => (
          <div className="card" key={book.id}>
            <img src={book.image} alt={book.title} />

            <h2>{book.title}</h2>
            <h4>{book.author}</h4>

            <p>{book.genre}</p>
            <p>{book.description}</p>

            <p>{book.rating}</p>

            <h3>{book.price}</h3>

            <button>View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;