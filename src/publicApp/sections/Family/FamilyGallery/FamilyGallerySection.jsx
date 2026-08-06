import { motion } from "framer-motion";
import "./FamilyGallerySection.css"

const FamilyGallerySection = ({ gallery }) => {

  if (!gallery || gallery.length === 0) return null;

  return (

    <section className="family-gallery">

      <div className="section-title">

        <h2>Family Gallery</h2>

        <p>
          Precious memories, celebrations, milestones and
          unforgettable moments shared together.
        </p>

      </div>

      <div className="gallery-grid">

        {gallery.map((item, index) => (

          <motion.div

            key={item._id}

            className="gallery-card"

            initial={{
              opacity:0,
              scale:.9
            }}

            whileInView={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:.5,
              delay:index*.08
            }}

            viewport={{
              once:true
            }}

          >

            <div className="gallery-image-wrapper">

              <img

                src={item.image}

                alt={item.imageAlt}

                className="gallery-image"

              />

              <span className="gallery-category">

                {item.category}

              </span>

            </div>

            <div className="gallery-content">

              <h3>

                {item.title}

              </h3>

              <p>

                {item.description}

              </p>

              {item.location && (

                <div className="gallery-location">

                  📍 {item.location}

                </div>

              )}

              {item.eventDate && (

                <div className="gallery-date">

                  📅 {new Date(item.eventDate).toLocaleDateString()}

                </div>

              )}

              {item.imageCaption && (

                <blockquote>

                  {item.imageCaption}

                </blockquote>

              )}

            </div>

          </motion.div>

        ))}

      </div>

    </section>

  );

};

export default FamilyGallerySection;