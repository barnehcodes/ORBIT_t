import { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";

import { staggerContainer, textVariant } from "../utils/motion";
import { ExploreCard } from "../components";

const exploreWorlds = [
  {
    id: "world-1",
    imgUrl: "src/components/planets/planet-09.png",
    title: "Explore 3D models",
  },
  {
    id: "world-2",
    imgUrl: "src/components/planets/planet-04.png",
    title: "Create and share",
  },
  {
    id: "world-3",
    imgUrl: "src/components/planets/planet-05.png",
    title: "Look for ideas",
  },
  {
    id: "world-4",
    imgUrl: "src/components/planets/planet-06.png",
    title: "Share your thoughts with others",
  },
  {
    id: "world-5",
    imgUrl: "src/components/planets/planet-07.png",
    title: "Meet other designers",
  },
];

const Explore = () => {
  const [active, setActive] = useState("world-2");

  return (
    <section className={`${styles.padding}`} id="explore">
      <motion.div variants={textVariant()}>
        <p className={styles.heroSubText}>what we offer </p>
        <h2 className={styles.heroHeadText}>Overview</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
