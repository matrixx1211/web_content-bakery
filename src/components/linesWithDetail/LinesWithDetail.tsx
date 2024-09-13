import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * @description vykreslí řádky z pole a přidá jim animaci a styl
 * @param anim animace řádků musí být v property .line
 * @param linesWithDetail pole řádků - objekt title a detail
 * @param style styl řádku musí být .className { .lineText {} }
 * @param className ve výchozím stavu "linesText"
 * @param customLines vlastní řádek s tagem
 */
export default function LinesWithDetail({
  anim,
  linesWithDetail,
  style,
  className = "linesText",
  customLines,
}: {
  anim: any;
  linesWithDetail: { title: string; detail: string }[];
  style: any;
  className?: string;
  customLines?: { index: number; childBefore?: ReactNode; childAfter?: ReactNode }[];
}) {
  const [lineTitleFocus, setLineTitleFocus] = useState({ anim: "initial", id: -1 });
  const [first, setFirst] = useState(true);
  let timeoutId: number;
  const lineTitleFocusEnter = (index: number) => {
    if (!first) {
      clearTimeout(timeoutId);
      setLineTitleFocus({ anim: "focus", id: index });
    }
  };
  const lineTitleFocusLeave = () => {
    if (!first) {
      timeoutId = setTimeout(() => {
        console.log(lineTitleFocus);
        if (lineTitleFocus.id !== -1) setLineTitleFocus({ anim: "default", id: -1 });
      }, 500);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (first) {
        setLineTitleFocus({ anim: "default", id: -1 });
        setFirst(false);
      }
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [lineTitleFocus]);

  function Line({
    lineWithDetail,
    index,
    customLine,
  }: {
    lineWithDetail: { title: string; detail: string };
    index: number;
    customLine?: any;
  }) {
    return (
      <div className={style.lineContainer}>
        <motion.span
          animate={lineTitleFocus.id === index ? lineTitleFocus.anim : lineTitleFocus.id !== -1 ? "unfocus" : "default"}
          {...(anim ? anim.line(index) : {})}
          className={style.lineTitle}
          onMouseEnter={() => lineTitleFocusEnter(index)}
          onMouseLeave={() => lineTitleFocusLeave()}
        >
          {customLine ? <>{customLine.childBefore}</> : <></>}
          {lineWithDetail.title}
          {customLine ? <>{customLine.childAfter}</> : <></>}
        </motion.span>
        <motion.p
          animate={lineTitleFocus.id === index ? lineTitleFocus.anim : "default"}
          {...(anim ? anim.detail : {})}
          className={style.lineDetail}
        >
          {lineWithDetail.detail}
        </motion.p>
      </div>
    );
  }

  return (
    <div className={style[className]}>
      {linesWithDetail.map((lwd, i) => {
        let customLine;
        if (customLines) customLine = customLines.find((cl) => cl.index === i);
        return <Line lineWithDetail={lwd} index={i} key={i} customLine={customLine} />;
      })}
    </div>
  );
}
