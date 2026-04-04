// /publicApp/sections/Gallery/Gallery.jsx

import { useEffect, useState } from "react";
import API from "../../../services/api";
import "./Gallery.css"
const Gallery = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const res = await API.get("/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!images.length) return <p>No images uploaded</p>;

  return (
    <section className="gallery section">
  <h2>Gallery</h2>

  <div className="grid">
    {images.map(img => (
      <img key={img._id} src={img.image} className="gallery-img" />
    ))}
  </div>
</section>
  );
};

export default Gallery;