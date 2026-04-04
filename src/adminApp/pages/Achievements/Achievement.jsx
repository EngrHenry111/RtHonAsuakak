import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";

import "./achievement.css"

const AchievementsPage = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", year: "", description: "" });
  const [id, setId] = useState(null);

  const fetchData = async () => {
    const res = await API.get("/achievement");
    setData(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const submit = async () => {
    if (id) {
      await API.put(`/achievement/${id}`, form);
      setId(null);
    } else {
      await API.post("/achievement", form);
    }
    setForm({ title: "", year: "", description: "" });
    fetchData();
  };

  const remove = async (id) => {
    await API.delete(`/achievement/${id}`);
    fetchData();
  };

  return (
      <Layout>
        <section className="admin-achievements">
      <h2>Achievements</h2>

      <input placeholder="Title" onChange={e => setForm({...form, title:e.target.value})}/>
      <input placeholder="Year" onChange={e => setForm({...form, year:e.target.value})}/>
      <textarea placeholder="Description" onChange={e => setForm({...form, description:e.target.value})}/>

      <button onClick={submit}>{id ? "Update" : "Add"}</button>

      {data.map(item => (
        <div key={item._id}>
          <h4>{item.title}</h4>
          <button onClick={()=>remove(item._id)}>Delete</button>
        </div>
      ))}
      </section>
      </Layout>
  );
};

export default AchievementsPage;