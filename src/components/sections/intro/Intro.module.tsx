import style from "./Intro.module.css";
import Header from "../../header/Header.module.tsx";
import Circle from "../../circle/Circle.module.tsx";
import { motion } from "framer-motion";

const lines = ["WE ARE", "MODERN", "DIGITAL", "FACTORY", "THAT HELPS", "TO OPTIMIZE,", "MODERNIZE", "AND GROW."];

function Line({ line, index }: { line: string; index: number }) {
  return (
    <div>
      <motion.span
        transition={{ type: "spring", stiffness: 75, duration: 0.5, delay: 0.1 * index }}
        whileInView={{ y: [60, 0] }}
        className={style.introTextLine}
      >
        {line}
      </motion.span>
    </div>
  );
}

function PageNumber() {
  return (
    <motion.div
      className={`${style.pageIndicator} area600`}
      transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
      whileInView={{ x: [-60, 0] }}
    >
      <motion.span
        transition={{ type: "spring", stiffness: 100, duration: 0.2 }}
        whileInView={{ x: [-60, 0], scale: [0.2, 1] }}
        className={style.pageNumber}
      >
        01
      </motion.span>
    </motion.div>
  );
}

export default function Intro() {
  return (
    <section id="intro" className={style.contentContainer + " contentContainer"}>
      <PageNumber />

      <div className={style.flex}>
        <Header onlyActive={false} />
        <div className={`${style.introText} nimbus900`}>
          {lines.map((line, i) => (
            <Line line={line} index={i} key={i} />
          ))}
        </div>

        <Circle id="before-whoweare" />
      </div>
    </section>
  );
}
