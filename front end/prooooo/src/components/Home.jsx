import React from "react";
import "./Home.css";

import heroImg from "../assets/hero.png";
import herImg from "../assets/imgbg.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const Home = () => {
  return (
    <section className="home">
      <div className="home-content">
        <div className="text-section">
          <h1>Welcome</h1>
          <p>
            Build beautiful websites with React.
          </p>

          <button>Get Started</button>
        </div>

        <div className="gallery">
  <img src={heroImg} alt="Hero" />
  <img src={herImg} alt="Background" />
  <img src={img1} alt="Image 1" />
  <img src={img2} alt="Image 2" />
  <img src={img3} alt="Image 3" />
  <img src={img4} alt="Image 4" />
</div>
      </div>
    </section>
  );
};

export default Home;