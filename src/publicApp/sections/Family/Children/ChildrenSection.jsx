import { motion } from "framer-motion";
import "./ChildrenSection.css"

const ChildrenSection = ({ children }) => {

  if (!children || children.length === 0) return null;

  return (

    <section className="family-children">

      <div className="section-title">

        <h2>Our Children</h2>

        <p>
          Meet the children of the family and celebrate
          their achievements, education, and aspirations.
        </p>

      </div>

      <div className="children-grid">

        {children.map((child, index) => (

          <motion.div
            key={child._id}
            className="child-card"
            initial={{
              opacity: 0,
              y: 40
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.1
            }}
            viewport={{
              once: true
            }}
          >

            {child.image && (

              <img
                src={child.image}
                alt={child.imageAlt}
                className="child-image"
              />

            )}

            <div className="child-info">

              <h3>{child.fullName}</h3>

              <span className="gender">
                {child.gender}
              </span>

              {child.education && (
                <p>
                  <strong>Education:</strong>{" "}
                  {child.education}
                </p>
              )}

              {child.occupation && (
                <p>
                  <strong>Occupation:</strong>{" "}
                  {child.occupation}
                </p>
              )}

              {child.dateOfBirth && (
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {child.dateOfBirth}
                </p>
              )}

              {child.biography && (
                <p className="bio">
                  {child.biography}
                </p>
              )}

              {child.achievements?.length > 0 && (

                <>

                  <h4>Achievements</h4>

                  <ul className="achievement-list">

                    {child.achievements.map((item, i) => (

                      <li key={i}>
                        {item}
                      </li>

                    ))}

                  </ul>

                </>

              )}

            </div>

          </motion.div>

        ))}

      </div>

    </section>

  );

};

export default ChildrenSection;