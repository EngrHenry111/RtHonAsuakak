import { useEffect, useState } from "react";
import API from "../../../../services/api";
import Layout from "../../../components/Layout/Layout";
import "./FamilyGallery.css";

const FamilyGallery = () => {

  const [gallery, setGallery] = useState([]);
  const [familyId, setFamilyId] = useState("");

  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({

    title: "",

    description: "",

    imageAlt: "",

    imageCaption: "",

    location: "",

    eventDate: "",

    category: "Family",

    displayOrder: 1,

    isFeatured: false,

    isPublished: true

  });

  /* ===============================
      LOAD FAMILY
  =============================== */

  const fetchFamily = async () => {

    const res = await API.get("/family");

    if (res.data.success && res.data.data.length > 0) {

      setFamilyId(res.data.data[0]._id);

    }

  };

  /* ===============================
      LOAD GALLERY
  =============================== */

  const fetchGallery = async () => {

    try {

      const res = await API.get("/family-gallery");

      setGallery(res.data.data);

    } catch (err) {

      console.log(err);

      setError("Unable to load gallery.");

    }

  };

  useEffect(() => {

    fetchFamily();

    fetchGallery();

  }, []);

  /* ===============================
      IMAGE
  =============================== */

  const handleImage = (e) => {

    const img = e.target.files[0];

    setFile(img);

    if (img) {

      setPreview(

        URL.createObjectURL(img)

      );

    }

  };

  /* ===============================
      SUBMIT
  =============================== */

  const submit = async () => {

    try {

      setLoading(true);

      setMessage("");

      setError("");

      const formData = new FormData();

      formData.append("family", familyId);

      formData.append("title", form.title);

      formData.append("description", form.description);

      formData.append("imageAlt", form.imageAlt);

      formData.append("imageCaption", form.imageCaption);

      formData.append("location", form.location);

      formData.append("eventDate", form.eventDate);

      formData.append("category", form.category);

      formData.append("displayOrder", form.displayOrder);

      formData.append("isFeatured", form.isFeatured);

      formData.append("isPublished", form.isPublished);

      if(file){

        formData.append("image",file);

      }

      if(id){

        await API.put(

          `/family-gallery/${id}`,

          formData

        );

        setMessage("Gallery updated successfully.");

      }else{

        await API.post(

          "/family-gallery",

          formData

        );

        setMessage("Gallery created successfully.");

      }

      resetForm();

      fetchGallery();

    }catch(err){

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Something went wrong."

      );

    }finally{

      setLoading(false);

    }

  };

  /* ===============================
      DELETE
  =============================== */

  const remove = async(galleryId)=>{

    if(!window.confirm("Delete this gallery item?")) return;

    try{

      await API.delete(

        `/family-gallery/${galleryId}`

      );

      setMessage("Deleted successfully.");

      fetchGallery();

    }catch{

      setError("Delete failed.");

    }

  };

  /* ===============================
      EDIT
  =============================== */

  const edit=(item)=>{

    setId(item._id);

    setPreview(item.image);

    setForm({

      title:item.title,

      description:item.description,

      imageAlt:item.imageAlt,

      imageCaption:item.imageCaption,

      location:item.location,

      eventDate:item.eventDate?.substring(0,10),

      category:item.category,

      displayOrder:item.displayOrder,

      isFeatured:item.isFeatured,

      isPublished:item.isPublished

    });

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  };

  /* ===============================
      RESET
  =============================== */

  const resetForm=()=>{

    setId(null);

    setFile(null);

    setPreview("");

    setForm({

      title:"",

      description:"",

      imageAlt:"",

      imageCaption:"",

      location:"",

      eventDate:"",

      category:"Family",

      displayOrder:1,

      isFeatured:false,

      isPublished:true

    });

  };
    return (
    <Layout>
      <section className="admin-family-gallery">

        <h2>Family Gallery Management</h2>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="gallery-form">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="gallery-preview"
            />
          )}

          <input
            type="text"
            placeholder="Event Title"
            value={form.title}
            onChange={(e)=>
              setForm({
                ...form,
                title:e.target.value
              })
            }
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e)=>
              setForm({
                ...form,
                location:e.target.value
              })
            }
          />

          <input
            type="date"
            value={form.eventDate}
            onChange={(e)=>
              setForm({
                ...form,
                eventDate:e.target.value
              })
            }
          />

          <select
            value={form.category}
            onChange={(e)=>
              setForm({
                ...form,
                category:e.target.value
              })
            }
          >
            <option value="Family">Family</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Award">Award</option>
            <option value="Community">Community</option>
            <option value="Religious">Religious</option>
            <option value="Celebration">Celebration</option>
            <option value="Vacation">Vacation</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Image Alt"
            value={form.imageAlt}
            onChange={(e)=>
              setForm({
                ...form,
                imageAlt:e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Image Caption"
            value={form.imageCaption}
            onChange={(e)=>
              setForm({
                ...form,
                imageCaption:e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(e)=>
              setForm({
                ...form,
                displayOrder:e.target.value
              })
            }
          />

          <label className="checkbox">

            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e)=>
                setForm({
                  ...form,
                  isPublished:e.target.checked
                })
              }
            />

            Published

          </label>

          <label className="checkbox">

            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e)=>
                setForm({
                  ...form,
                  isFeatured:e.target.checked
                })
              }
            />

            Featured

          </label>

          <div className="gallery-buttons">

            <button
              onClick={submit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : id
                ? "Update Gallery"
                : "Create Gallery"}
            </button>

            {id && (
              <button
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </div>

        <hr />

        <div className="gallery-list">

          {gallery.length===0 ? (

            <p>No gallery events found.</p>

          ) : (

            gallery.map(item=>(

              <div
                className="gallery-card"
                key={item._id}
              >

                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="gallery-card-image"
                />

                <div className="gallery-content">

                  <h3>{item.title}</h3>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {item.location}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(item.eventDate).toLocaleDateString()}
                  </p>

                  <p>{item.description}</p>

                  {item.imageCaption && (
                    <blockquote>
                      {item.imageCaption}
                    </blockquote>
                  )}

                  <div className="status-row">

                    <span>
                      {item.isPublished
                        ? "Published"
                        : "Hidden"}
                    </span>

                    <span>
                      {item.isFeatured
                        ? "Featured"
                        : "Normal"}
                    </span>

                  </div>

                  <div className="gallery-actions">

                    <button
                      onClick={() => edit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => remove(item._id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </section>
    </Layout>
  );
};

export default FamilyGallery;