import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./education.css"
const Education = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/education").then(res => setData(res.data));
  }, []);

  return (
    <section className="education section">
      <h2>Education</h2>

      {data.map(item => (
        <div key={item._id}>
          <h4>{item.school}</h4>
          <p>{item.degree}</p>
          <p>{item.startYear} - {item.endYear}</p>
        </div>
      ))}
    </section>
  );
};

export default Education;