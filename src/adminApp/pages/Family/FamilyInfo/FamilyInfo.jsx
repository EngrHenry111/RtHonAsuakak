import { useEffect, useState } from "react";
import API from "../../../../services/api";
import Layout from "../../../components/Layout/Layout";
import "./FamilyInfo.css";

const FamilyInfo = () => {

  const [data, setData] = useState([]);

  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({

    introduction: "",

    familyMotto: "",

    familyStory: "",

    familyVision: "",

    familyValues: "",

    bannerAlt: "",

    displayOrder: 1,

    isPublished: true

  });

  /* ===============================
      FETCH DATA
  ================================ */

  const fetchData = async () => {

    try {

      const res = await API.get("/family");

      setData(res.data.data);

    } catch (err) {

      console.log(err);

      setError("Unable to load family information.");

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  /* ===============================
      IMAGE
  ================================ */

  const handleImage = (e) => {

    const image = e.target.files[0];

    setFile(image);

    if (image) {

      setPreview(URL.createObjectURL(image));

    }

  };

  /* ===============================
      SUBMIT
  ================================ */

  const submit = async () => {

    try {

      setLoading(true);

      setMessage("");

      setError("");

      const formData = new FormData();

      formData.append("introduction", form.introduction);

      formData.append("familyMotto", form.familyMotto);

      formData.append("familyStory", form.familyStory);

      formData.append("familyVision", form.familyVision);

      formData.append(
        "familyValues",
        JSON.stringify(
          form.familyValues
            .split(",")
            .map(item => item.trim())
        )
      );

      formData.append("bannerAlt", form.bannerAlt);

      formData.append(
        "displayOrder",
        form.displayOrder
      );

      formData.append(
        "isPublished",
        form.isPublished
      );

      if (file) {

        formData.append(
          "bannerImage",
          file
        );

      }

      if (id) {

        await API.put(

          `/family/${id}`,

          formData

        );

        setMessage(
          "Family information updated successfully."
        );

      } else {

        await API.post(

          "/family",

          formData

        );

        setMessage(
          "Family information created successfully."
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

  /* ===============================
      DELETE
  ================================ */

  const remove = async (familyId) => {

    const confirmDelete = window.confirm(

      "Delete this family information?"

    );

    if (!confirmDelete) return;

    try {

      await API.delete(

        `/family/${familyId}`

      );

      setMessage(

        "Deleted successfully."

      );

      fetchData();

    } catch {

      setError(

        "Delete failed."

      );

    }

  };

  /* ===============================
      EDIT
  ================================ */

  const edit = (item) => {

    setId(item._id);

    setForm({

      introduction:
        item.introduction,

      familyMotto:
        item.familyMotto,

      familyStory:
        item.familyStory,

      familyVision:
        item.familyVision,

      familyValues:
        item.familyValues.join(", "),

      bannerAlt:
        item.bannerAlt,

      displayOrder:
        item.displayOrder,

      isPublished:
        item.isPublished

    });

    setPreview(item.bannerImage);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  /* ===============================
      RESET
  ================================ */

  const resetForm = () => {

    setId(null);

    setFile(null);

    setPreview("");

    setForm({

      introduction: "",

      familyMotto: "",

      familyStory: "",

      familyVision: "",

      familyValues: "",

      bannerAlt: "",

      displayOrder: 1,

      isPublished: true

    });

  };
    return (
    <Layout>
      <section className="admin-family">

        <h2>Family Information</h2>

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

        <div className="family-form">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="Banner Preview"
              className="banner-preview"
            />
          )}

          <textarea
            placeholder="Family Introduction"
            value={form.introduction}
            onChange={(e) =>
              setForm({
                ...form,
                introduction: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Family Motto"
            value={form.familyMotto}
            onChange={(e) =>
              setForm({
                ...form,
                familyMotto: e.target.value
              })
            }
          />

          <textarea
            placeholder="Family Story"
            value={form.familyStory}
            onChange={(e) =>
              setForm({
                ...form,
                familyStory: e.target.value
              })
            }
          />

          <textarea
            placeholder="Family Vision"
            value={form.familyVision}
            onChange={(e) =>
              setForm({
                ...form,
                familyVision: e.target.value
              })
            }
          />

          <textarea
            placeholder="Family Values (Separate with commas)"
            value={form.familyValues}
            onChange={(e) =>
              setForm({
                ...form,
                familyValues: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Banner Alt Text"
            value={form.bannerAlt}
            onChange={(e) =>
              setForm({
                ...form,
                bannerAlt: e.target.value
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

          <div className="family-buttons">

            <button
              onClick={submit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : id
                ? "Update Family"
                : "Create Family"}
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

        <div className="family-list">

          {data.length === 0 ? (

            <p>No family information available.</p>

          ) : (

            data.map((item) => (

              <div
                className="family-card"
                key={item._id}
              >

                {item.bannerImage && (

                  <img
                    src={item.bannerImage}
                    alt={item.bannerAlt}
                    className="family-card-image"
                  />

                )}

                <h3>Family Motto</h3>

                <p>{item.familyMotto}</p>

                <h3>Introduction</h3>

                <p>{item.introduction}</p>

                <h3>Story</h3>

                <p>{item.familyStory}</p>

                <h3>Vision</h3>

                <p>{item.familyVision}</p>

                <h3>Values</h3>

                <ul>

                  {item.familyValues?.map((value, index) => (

                    <li key={index}>
                      {value}
                    </li>

                  ))}

                </ul>

                <div className="family-actions">

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

            ))

          )}

        </div>

      </section>
    </Layout>
  );
};

export default FamilyInfo;