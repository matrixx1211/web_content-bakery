import style from "../Intro.module.scss";
import { motion } from "framer-motion";
import { IntroAnimConfig } from "../../../../assets/config/IntroAnim.config.tsx";

export default function PageNumber({ anim }: {anim: any}) {
  return (
    <motion.div className={style.pageIndicator} {...anim.pageIndicator}>
      <motion.span className={style.pageNumber} {...anim.pageNumber}>
        01
      </motion.span>
    </motion.div>
  );
}
