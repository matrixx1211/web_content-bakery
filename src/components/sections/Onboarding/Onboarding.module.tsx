import { motion } from "framer-motion";
import logo from "../../../assets/images/Onboarding.png";
import style from "./Onboarding.module.scss";
import { useEffect, useState } from "react";
import { onboardingDuration } from "../../../assets/config/AnimCfg.tsx";

export default function Onboarding() {
  /* Animace by měla být taková, že se dá fadeIn na logo a po nějaké době se dá fadeOut na logo a následuje klasika */
  const [imageAnimate, setImageAnimate] = useState("loading");
  const imageVariants = {
    loading: {
      opacity: [0, 1],
      transition: { delay: onboardingDuration * 0.1, duration: onboardingDuration * 0.4 },
    },
    hide: {
      opacity: [1, 0],
      transition: { duration: onboardingDuration * 0.3 },
    },
  };
  const divVariants = {
    loading: {
      display: "flex",
      transition: { duration: onboardingDuration * 0.5 },
    },
    hide: {
      display: "none",
      opacity: [1, 0],
      transition: { duration: onboardingDuration * 0.3 },
    },
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        if (imageAnimate === "loading") {
          setImageAnimate("hide");
        }
      },
      onboardingDuration * 0.85 * 1000,
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [imageAnimate]);

  return (
    <motion.div id="Onboarding" className={style.boardingContainer} animate={imageAnimate} variants={divVariants}>
      <motion.img src={logo} className={style.loader} animate={imageAnimate} variants={imageVariants} />
    </motion.div>
  );
}
