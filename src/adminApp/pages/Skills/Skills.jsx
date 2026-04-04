import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./skills.css"
const SkillsPage = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", level: "" });
  const [id, setId] = useState(null);

  const fetch = async () => {
    const res = await API.get("/skill");
    setData(res.data);
  };

  useEffect(() => { fetch(); }, []);

  const submit = async () => {
    if (id) {
      await API.put(`/skill/${id}`, form);
      setId(null);
    } else {
      await API.post("/skill", form);
    }

    setForm({ name: "", level: "" });
    fetch();
  };

  const remove = async (id) => {
    await API.delete(`/skill/${id}`);
    fetch();
  };

  return (
      <Layout>
        <section className="admin-skills">
      <h2>Skills</h2>

      <input placeholder="Skill" onChange={e => setForm({...form, name:e.target.value})}/>
      <input placeholder="Level" onChange={e => setForm({...form, level:e.target.value})}/>

      <button onClick={submit}>{id ? "Update" : "Add"}</button>

      {data.map(item => (
        <div key={item._id}>
          <h4>{item.name} ({item.level})</h4>
          <button onClick={() => remove(item._id)}>Delete</button>
        </div>
      ))}
      </section>
    </Layout>
  );
};

export default SkillsPage;