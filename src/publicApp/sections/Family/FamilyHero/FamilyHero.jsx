import { motion } from "framer-motion";
import "./FamilyHero.css";

const FamilyHero = ({ family }) => {

  if (!family) return null;

  return (

    <section className="family-hero">

      <div className="family-overlay"></div>

      <img
        src={family.bannerImage}
        alt={family.bannerAlt}
        className="family-banner"
      />

      <div className="family-hero-content">

        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:.8 }}
        >

          <h1>
            Our Family
          </h1>

          <h2>
            {family.familyMotto}
          </h2>

          <p className="intro">

            {family.introduction}

          </p>

        </motion.div>

      </div>

    </section>

  );

};

export default FamilyHero;