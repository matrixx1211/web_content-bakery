import { motion } from "framer-motion";
import style from "../Intro.module.scss";

export default function Lines({ imageFocus, anim }: { imageFocus: any; anim: any }) {
  const lines = ["WE ARE", "MODERN", "DIGITAL", "FACTORY", "THAT HELPS", "TO OPTIMIZE,", "MODERNIZE", "AND GROW."];

  function Line({ text, index }: { text: string; index: number }) {
    return (
      <div>
        <motion.span animate={imageFocus.anim} {...anim.line(index)} className={style.introTextLine}>
          {text}
        </motion.span>
      </div>
    );
  }

  return (
    <motion.div {...anim.introText(imageFocus.image >= 0)} className={style.introText}>
      {lines.map((line, i) => (
        <Line text={line} index={i} key={i} />
      ))}
    </motion.div>
  );
}
