import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../../services/api";
import Particles from "react-tsparticles";
import { Tilt } from "react-tilt";
import "./Hero.css";

const titles = [
  "Executive Chairman",
  "Community Leader",
  "Public Servant",
  "Visionary Leader"
];

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  // FETCH PROFILE
  useEffect(() => {
    API.get("/profile").then(res => setProfile(res.data[0]));
  }, []);

  // TYPEWRITER EFFECT
  useEffect(() => {
    let current = titles[index];
    let i = 0;

    const typing = setInterval(() => {
      setText(current.slice(0, i++));
      if (i > current.length) {
        clearInterval(typing);
        setTimeout(() => setIndex((prev) => (prev + 1) % titles.length), 2000);
      }
    }, 100);

    return () => clearInterval(typing);
  }, [index]);

  if (!profile) return <p>Loading...</p>;

  return (
    <section className="hero">


 {/* IMAGE WITH 3D TILT */}
    <div className="img">
        <Tilt options={{ max: 25, scale: 1.05 }}>
          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="image-ring">
              <img src={profile.image} alt="Chairman" />
            </div>
          </motion.div>
        </Tilt>
        </div>

      {/* PARTICLES */}
      <Particles
        options={{
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { speed: 1 },
            opacity: { value: 0.5 }
          }
        }}
        className="particles"
      />

      <div className="hero-container">

        {/* TEXT */}
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1>{profile.name}</h1>
          <h2 className="typing">{text}</h2>
          <p>{profile.bio}</p>

          {/* <button className="btn glow">Explore Leadership</button> */}
        {/* <a href="#leadership" className="btn glow">
          Explore Leadership
        </a> */}

              <button
          className="btn glow"
          onClick={() => {
            document.getElementById("leadership")?.scrollIntoView({
              behavior: "smooth"
            });
            }}
                  >
              Explore Leadership
            </button>
        </motion.div>

       
      </div>
    </section>
  );
};

export default Hero;