import { useEffect, useState } from "react";
import API from "../../../../services/api";

import FamilyHero from "../FamilyHero/FamilyHero";
import SpousesSection from "../Spouses/SpousesSection";
import ChildrenSection from "../Children/ChildrenSection";
import FamilyGallerySection from "../FamilyGallery/FamilyGallerySection";

import "./FamilyInfo.css";

const Family = () => {

  const [family, setFamily] = useState(null);

  const [spouses, setSpouses] = useState([]);

  const [children, setChildren] = useState([]);

  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {

    fetchAll();

  }, []);

  const fetchAll = async () => {

    try {

      setLoading(true);

      const [

        familyRes,

        spouseRes,

        childRes,

        galleryRes

      ] = await Promise.all([

        API.get("/family"),

        API.get("/spouse"),

        API.get("/child"),

        API.get("/family-gallery")

      ]);

      setFamily(

        familyRes.data.data[0] || null

      );

      setSpouses(

        spouseRes.data.data || []

      );

      setChildren(

        childRes.data.data || []

      );

      setGallery(

        galleryRes.data.data || []

      );

    } catch (err) {

      console.log(err);

      setError(

        "Unable to load family information."

      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <section className="family-loading">

        <h2>Loading Family Information...</h2>

      </section>

    );

  }

  if (error) {

    return (

      <section className="family-loading">

        <h2>{error}</h2>

      </section>

    );

  }

  return (

    <div className="family-page">

      <FamilyHero family={family} />

      <SpousesSection spouses={spouses} />

      <ChildrenSection children={children} />

      <FamilyGallerySection gallery={gallery} />

    </div>

  );

};

export default Family;