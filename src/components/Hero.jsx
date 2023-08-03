import React from "react";
import { color, motion } from "framer-motion";
import { styles } from "../styles";
import { TypeAnimation } from "react-type-animation";
import "./hero.css";

import { BlackholeCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute  inset-0 
        top-[120px] max-w-7xl mx-auto 
        flex flex-row items-start gap-5`}
      >
        <div class="wrapper relative ">
          <div class="static-txt">
            <span>Orbit</span> A Tool For
          </div>
          <ul class="dynamic-txts">
            <li>
              <span>Developer</span>
            </li>
            <li>
              <span>Designer</span>
            </li>
            <li>
              <span>Artist</span>
            </li>
            <li>
              <span>Anyone</span>
            </li>
          </ul>
        </div>
      </div>

      <BlackholeCanvas />
      <div className="absolute flex xs:bottom-10 bottom-32 w-full justify-center items-center">
        <a href="#about">
          {/* <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div> */}
        </a>
      </div>
    </section>
  );
};

export default Hero;
