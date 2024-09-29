import { motion } from "framer-motion";
import logo from "../../../assets/images/Onboarding.png";
import style from "./Onboarding.module.scss";
import { useEffect, useState } from "react";
import { AnimCfg, onboardingDuration } from "../../../assets/config/AnimCfg.tsx";

export default function Onboarding() {
  const [imageAnimate, setImageAnimate] = useState("loading");

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
    <motion.div id="Onboarding" className={style.boardingContainer} animate={imageAnimate} {...(AnimCfg.general.onboarding.div)}>
      <motion.img src={logo} className={style.loader} animate={imageAnimate} {...(AnimCfg.general.onboarding.image)} />
    </motion.div>
  );
}
