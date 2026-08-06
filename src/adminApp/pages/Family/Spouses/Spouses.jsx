import { useEffect, useState } from "react";
import API from "../../../../services/api";
import Layout from "../../../components/Layout/Layout";
import "./Spouses.css";

const Spouses = () => {

  const [data, setData] = useState([]);
  const [familyId, setFamilyId] = useState("");

  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({

    fullName: "",

    occupation: "",

    biography: "",

    personalMessage: "",

    marriageDate: "",

    imageAlt: "",

    displayOrder: 1,

    isPublished: true,

    isFeatured: false

  });

  /* =====================================
        LOAD FAMILY
  ====================================== */

  const fetchFamily = async () => {

    try {

      const res = await API.get("/family");

      if (
        res.data.success &&
        res.data.data.length > 0
      ) {

        setFamilyId(
          res.data.data[0]._id
        );

      }

    } catch (err) {

      console.log(err);

    }

  };

  /* =====================================
        LOAD SPOUSES
  ====================================== */

  const fetchData = async () => {

    try {

      const res = await API.get("/spouse");

      setData(res.data.data);

    } catch (err) {

      console.log(err);

      setError("Unable to load spouses.");

    }

  };

  useEffect(() => {

    fetchFamily();

    fetchData();

  }, []);

  /* =====================================
        IMAGE
  ====================================== */

  const handleImage = (e) => {

    const image = e.target.files[0];

    setFile(image);

    if (image) {

      setPreview(
        URL.createObjectURL(image)
      );

    }

  };

  /* =====================================
        SUBMIT
  ====================================== */

  const submit = async () => {

    try {

      setLoading(true);

      setMessage("");

      setError("");

      const formData = new FormData();

      formData.append(
        "family",
        familyId
      );

      formData.append(
        "fullName",
        form.fullName
      );

      formData.append(
        "occupation",
        form.occupation
      );

      formData.append(
        "biography",
        form.biography
      );

      formData.append(
        "personalMessage",
        form.personalMessage
      );

      formData.append(
        "marriageDate",
        form.marriageDate
      );

      formData.append(
        "imageAlt",
        form.imageAlt
      );

      formData.append(
        "displayOrder",
        form.displayOrder
      );

      formData.append(
        "isPublished",
        form.isPublished
      );

      formData.append(
        "isFeatured",
        form.isFeatured
      );

      if (file) {

        formData.append(
          "image",
          file
        );

      }

      if (id) {

        await API.put(

          `/spouse/${id}`,

          formData

        );

        setMessage(
          "Spouse updated successfully."
        );

      } else {

        await API.post(

          "/spouse",

          formData

        );

        setMessage(
          "Spouse added successfully."
        );

      }

      resetForm();

      fetchData();

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

        "Something went wrong."

      );

    } finally {

      setLoading(false);

    }

  };

  /* =====================================
        DELETE
  ====================================== */

  const remove = async (spouseId) => {

    const ok = window.confirm(

      "Delete this spouse?"

    );

    if (!ok) return;

    try {

      await API.delete(

        `/spouse/${spouseId}`

      );

      setMessage(
        "Deleted successfully."
      );

      fetchData();

    } catch (err) {

      setError(
        "Delete failed."
      );

    }

  };

  /* =====================================
        EDIT
  ====================================== */

  const edit = (item) => {

    setId(item._id);

    setForm({

      fullName:
        item.fullName,

      occupation:
        item.occupation,

      biography:
        item.biography,

      personalMessage:
        item.personalMessage,

      marriageDate:
        item.marriageDate,

      imageAlt:
        item.imageAlt,

      displayOrder:
        item.displayOrder,

      isPublished:
        item.isPublished,

      isFeatured:
        item.isFeatured

    });

    setPreview(item.image);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  /* =====================================
        RESET
  ====================================== */

  const resetForm = () => {

    setId(null);

    setFile(null);

    setPreview("");

    setForm({

      fullName: "",

      occupation: "",

      biography: "",

      personalMessage: "",

      marriageDate: "",

      imageAlt: "",

      displayOrder: 1,

      isPublished: true,

      isFeatured: false

    });

  };
    return (
    <Layout>
      <section className="admin-spouses">

        <h2>Spouse Management</h2>

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

        <div className="spouse-form">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="spouse-preview"
            />
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Occupation"
            value={form.occupation}
            onChange={(e) =>
              setForm({
                ...form,
                occupation: e.target.value
              })
            }
          />

          <textarea
            placeholder="Biography"
            value={form.biography}
            onChange={(e) =>
              setForm({
                ...form,
                biography: e.target.value
              })
            }
          />

          <textarea
            placeholder="Personal Message"
            value={form.personalMessage}
            onChange={(e) =>
              setForm({
                ...form,
                personalMessage: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Marriage Date"
            value={form.marriageDate}
            onChange={(e) =>
              setForm({
                ...form,
                marriageDate: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Image Alt"
            value={form.imageAlt}
            onChange={(e) =>
              setForm({
                ...form,
                imageAlt: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(e) =>
              setForm({
                ...form,
                displayOrder: e.target.value
              })
            }
          />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) =>
                setForm({
                  ...form,
                  isPublished: e.target.checked
                })
              }
            />
            Published
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({
                  ...form,
                  isFeatured: e.target.checked
                })
              }
            />
            Featured
          </label>

          <div className="spouse-buttons">

            <button
              onClick={submit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : id
                ? "Update Spouse"
                : "Add Spouse"}
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

        <div className="spouse-list">

          {data.length === 0 ? (

            <p>No spouse has been added.</p>

          ) : (

            data.map((item) => (

              <div
                className="spouse-card"
                key={item._id}
              >

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="spouse-card-image"
                  />
                )}

                <div className="spouse-content">

                  <h3>{item.fullName}</h3>

                  <p>
                    <strong>Occupation:</strong>{" "}
                    {item.occupation}
                  </p>

                  <p>
                    <strong>Marriage Date:</strong>{" "}
                    {item.marriageDate}
                  </p>

                  <p>{item.biography}</p>

                  <blockquote>
                    {item.personalMessage}
                  </blockquote>

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

                  <div className="spouse-actions">

                    <button
                      onClick={() => edit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        remove(item._id)
                      }
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

export default Spouses;