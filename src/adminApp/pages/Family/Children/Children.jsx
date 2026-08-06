import { useEffect, useState } from "react";
import API from "../../../../services/api";
import Layout from "../../../components/Layout/Layout";
import "./Children.css";

const Children = () => {

  const [children, setChildren] = useState([]);
  const [spouses, setSpouses] = useState([]);

  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({

    spouse: "",

    fullName: "",

    gender: "Male",

    occupation: "",

    education: "",

    biography: "",

    achievements: "",

    dateOfBirth: "",

    imageAlt: "",

    imageCaption: "",

    displayOrder: 1,

    isPublished: true,

    isFeatured: false

  });

  /* ==========================
      LOAD SPOUSES
  ========================== */

  const fetchSpouses = async () => {

    try {

      const res = await API.get("/spouse");

      setSpouses(res.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  /* ==========================
      LOAD CHILDREN
  ========================== */

  const fetchChildren = async () => {

    try {

      const res = await API.get("/child");

      setChildren(res.data.data);

    } catch (err) {

      console.log(err);

      setError("Unable to load children.");

    }

  };

  useEffect(() => {

    fetchSpouses();

    fetchChildren();

  }, []);

  /* ==========================
      IMAGE
  ========================== */

  const handleImage = (e) => {

    const image = e.target.files[0];

    setFile(image);

    if (image) {

      setPreview(

        URL.createObjectURL(image)

      );

    }

  };

  /* ==========================
      SUBMIT
  ========================== */

  const submit = async () => {

    try {

      setLoading(true);

      setMessage("");

      setError("");

      const formData = new FormData();

      formData.append("spouse", form.spouse);

      formData.append("fullName", form.fullName);

      formData.append("gender", form.gender);

      formData.append("occupation", form.occupation);

      formData.append("education", form.education);

      formData.append("biography", form.biography);

      formData.append(

        "achievements",

        JSON.stringify(

          form.achievements

            .split(",")

            .map(item => item.trim())

        )

      );

      formData.append(

        "dateOfBirth",

        form.dateOfBirth

      );

      formData.append(

        "imageAlt",

        form.imageAlt

      );

      formData.append(

        "imageCaption",

        form.imageCaption

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

          `/child/${id}`,

          formData

        );

        setMessage(

          "Child updated successfully."

        );

      } else {

        await API.post(

          "/child",

          formData

        );

        setMessage(

          "Child added successfully."

        );

      }

      resetForm();

      fetchChildren();

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

  /* ==========================
      DELETE
  ========================== */

  const remove = async (childId) => {

    const ok = window.confirm(

      "Delete this child?"

    );

    if (!ok) return;

    try {

      await API.delete(

        `/child/${childId}`

      );

      setMessage(

        "Deleted successfully."

      );

      fetchChildren();

    } catch {

      setError(

        "Delete failed."

      );

    }

  };

  /* ==========================
      EDIT
  ========================== */

  const edit = (item) => {

    setId(item._id);

    setForm({

      spouse: item.spouse?._id || "",

      fullName: item.fullName,

      gender: item.gender,

      occupation: item.occupation,

      education: item.education,

      biography: item.biography,

      achievements: item.achievements.join(", "),

      dateOfBirth: item.dateOfBirth,

      imageAlt: item.imageAlt,

      imageCaption: item.imageCaption,

      displayOrder: item.displayOrder,

      isPublished: item.isPublished,

      isFeatured: item.isFeatured

    });

    setPreview(item.image);

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  };

  /* ==========================
      RESET
  ========================== */

  const resetForm = () => {

    setId(null);

    setFile(null);

    setPreview("");

    setForm({

      spouse: "",

      fullName: "",

      gender: "Male",

      occupation: "",

      education: "",

      biography: "",

      achievements: "",

      dateOfBirth: "",

      imageAlt: "",

      imageCaption: "",

      displayOrder: 1,

      isPublished: true,

      isFeatured: false

    });

  };
    return (
    <Layout>
      <section className="admin-children">

        <h2>Children Management</h2>

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

        <div className="children-form">

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="child-preview"
            />
          )}

          <select
            value={form.spouse}
            onChange={(e) =>
              setForm({
                ...form,
                spouse: e.target.value
              })
            }
          >
            <option value="">Select Parent</option>

            {spouses.map((spouse) => (
              <option
                key={spouse._id}
                value={spouse._id}
              >
                {spouse.fullName}
              </option>
            ))}
          </select>

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

          <select
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value
              })
            }
          >
            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>
          </select>

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

          <input
            type="text"
            placeholder="Education"
            value={form.education}
            onChange={(e) =>
              setForm({
                ...form,
                education: e.target.value
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
            placeholder="Achievements (Separate with commas)"
            value={form.achievements}
            onChange={(e) =>
              setForm({
                ...form,
                achievements: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Date of Birth"
            value={form.dateOfBirth}
            onChange={(e) =>
              setForm({
                ...form,
                dateOfBirth: e.target.value
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
            type="text"
            placeholder="Image Caption"
            value={form.imageCaption}
            onChange={(e) =>
              setForm({
                ...form,
                imageCaption: e.target.value
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

          <div className="children-buttons">

            <button
              onClick={submit}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : id
                ? "Update Child"
                : "Add Child"}
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

        <div className="children-list">

          {children.length === 0 ? (

            <p>No children have been added.</p>

          ) : (

            children.map((child) => (

              <div
                className="child-card"
                key={child._id}
              >

                {child.image && (
                  <img
                    src={child.image}
                    alt={child.imageAlt}
                    className="child-card-image"
                  />
                )}

                <div className="child-content">

                  <h3>{child.fullName}</h3>

                  <p>
                    <strong>Parent:</strong>{" "}
                    {child.spouse?.fullName}
                  </p>

                  <p>
                    <strong>Gender:</strong>{" "}
                    {child.gender}
                  </p>

                  <p>
                    <strong>Occupation:</strong>{" "}
                    {child.occupation}
                  </p>

                  <p>
                    <strong>Education:</strong>{" "}
                    {child.education}
                  </p>

                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {child.dateOfBirth}
                  </p>

                  <p>{child.biography}</p>

                  <h4>Achievements</h4>

                  <ul>
                    {child.achievements?.map(
                      (achievement, index) => (
                        <li key={index}>
                          {achievement}
                        </li>
                      )
                    )}
                  </ul>

                  <div className="status-row">

                    <span>
                      {child.isPublished
                        ? "Published"
                        : "Hidden"}
                    </span>

                    <span>
                      {child.isFeatured
                        ? "Featured"
                        : "Normal"}
                    </span>

                  </div>

                  <div className="child-actions">

                    <button
                      onClick={() => edit(child)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        remove(child._id)
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

export default Children;