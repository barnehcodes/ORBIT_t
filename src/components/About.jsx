import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <section className={`${styles.padding}`} id="About">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>introduction</p>
        <h2 className={styles.sectionHeadText}>About</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        This project is made to connect 3D inthauisst by sharing thier projects
        and arts in a open source manner, commenting, rating and many more ways
        to help each other in enhancing thier creation
      </motion.p>
    </section>
  );
};

export default SectionWrapper(About, "about");
