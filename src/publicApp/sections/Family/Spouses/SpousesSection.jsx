import { motion } from "framer-motion";
import "./SpousesSection.css"

const SpousesSection = ({ spouses }) => {

  if (!spouses || spouses.length === 0) return null;

  return (

    <section className="family-spouses">

      <div className="section-title">

        <h2>Our Family</h2>

        <p>
          Meet the wonderful women who have
          helped shape the strength, unity and
          values of our family.
        </p>

      </div>

      <div className="spouse-grid">

        {spouses.map((spouse, index) => (

          <motion.div

            key={spouse._id}

            className="spouse-card"

            initial={{
              opacity:0,
              y:50
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:.6,
              delay:index*.15
            }}

            viewport={{
              once:true
            }}

          >

            {spouse.image && (

              <img

                src={spouse.image}

                alt={spouse.imageAlt}

                className="spouse-image"

              />

            )}

            <div className="spouse-info">

              <h3>

                {spouse.fullName}

              </h3>

              <span className="occupation">

                {spouse.occupation}

              </span>

              <p>

                {spouse.biography}

              </p>

              {spouse.personalMessage && (

                <blockquote>

                  "{spouse.personalMessage}"

                </blockquote>

              )}

              {spouse.marriageDate && (

                <div className="marriage-date">

                  ❤️ Married: {spouse.marriageDate}

                </div>

              )}

            </div>

          </motion.div>

        ))}

      </div>

    </section>

  );

};

export default SpousesSection;