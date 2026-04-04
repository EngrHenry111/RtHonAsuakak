import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./Educaaton.css"

const EducationPage = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    school: "",
    degree: "",
    startYear: "",
    endYear: ""
  });

  const fetch = async () => {
    const res = await API.get("/education");
    setData(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const submit = async () => {
    await API.post("/education", form);
    fetch();
  };

  const remove = async (id) => {
    await API.delete(`/education/${id}`);
    fetch();
  };

  return (
  <Layout>
    <section className="admin-education">
     <h2>Education</h2>

      <input placeholder="School" onChange={e => setForm({...form, school:e.target.value})}/>
      <input placeholder="Degree" onChange={e => setForm({...form, degree:e.target.value})}/>
      <input placeholder="Start Year" onChange={e => setForm({...form, startYear:e.target.value})}/>
      <input placeholder="End Year" onChange={e => setForm({...form, endYear:e.target.value})}/>

      <button onClick={submit}>Add</button>

      {data.map(item => (
        <div key={item._id}>
          <h4>{item.school}</h4>
          <button onClick={() => remove(item._id)}>Delete</button>
        </div>
      ))}
      </section>
      </Layout>
  );
};

export default EducationPage;