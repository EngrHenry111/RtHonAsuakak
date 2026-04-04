import { useEffect, useState } from "react";
import API from "../../../services/api";
import Layout from "../../components/Layout/Layout";
import "./Gallery.css"

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchData = async () => {
    const res = await API.get("/gallery");
    setImages(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const upload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    await API.post("/gallery", formData);
    fetchData();
  };

  const remove = async (id) => {
    await API.delete(`/gallery/${id}`);
    fetchData();
  };

  return (
      <Layout>
      <h2>Gallery</h2>

      <input type="file" onChange={e => setFile(e.target.files[0])}/>
      <button onClick={upload}>Upload</button>

      {images.map(img => (
        <div key={img._id}>
          <img src={img.image} width="100"/>
          <button onClick={()=>remove(img._id)}>Delete</button>
        </div>
      ))}
      </Layout>
  );
};

export default GalleryPage;