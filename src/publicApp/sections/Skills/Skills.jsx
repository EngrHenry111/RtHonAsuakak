import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./skills.css"
const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    API.get("/skill").then(res => setSkills(res.data));
  }, []);

  return (
    <section className="skills section">
      <h2>Skills</h2>

      {skills.map(skill => (
        <div key={skill._id}>
          <p>{skill.name} - {skill.level}</p>
        </div>
      ))}
    </section>
  );
};

export default Skills;