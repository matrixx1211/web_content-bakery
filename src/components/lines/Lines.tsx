import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * @description vykreslí řádky z pole a přidá jim animaci a styl
 * @param anim animace řádků musí být v property .line
 * @param lines pole řádků
 * @param style styl řádku musí být .className { .lineText {} }
 * @param className ve výchozím stavu "linesText"
 * @param customLines vlastní řádek s tagem
 */
export default function Lines({
  anim,
  lines,
  style,
  className = "linesText",
  customLines,
}: {
  anim: any;
  lines: string[];
  style: any;
  className?: string;
  customLines?: { index: number; childBefore?: ReactNode; childAfter?: ReactNode }[];
}) {
  const [animate, setAnimate] = useState("initial");
  useEffect(() => {
    if (anim && anim.line(0).variants) {
      const times = anim.line(lines.length - 1).variants.initial.transition;
      const timeoutId = setTimeout(() => setAnimate("afterLoad"), (times.delay + times.duration) * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [anim]);

  function Line({ text, index, customLine }: { text: string; index: number; customLine?: any }) {
    return (
      <div key={index} style={{overflow: "hidden"}}>
        <motion.span animate={animate} {...(anim ? anim.line(index) : {})} className={style.lineText}>
          {customLine ? <>{customLine.childBefore}</> : <></>}
          {text}
          {customLine ? <>{customLine.childAfter}</> : <></>}
        </motion.span>
      </div>
    );
  }

  return (
    <div className={style[className]}>
      {lines.map((line, i) => {
        let customLine;
        if (customLines) customLine = customLines.find((cl) => cl.index === i);
        return <Line text={line} index={i} customLine={customLine} key={i} />;
      })}
    </div>
  );
}
