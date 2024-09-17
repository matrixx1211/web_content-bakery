import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  const [lineTitleFocus, setLineTitleFocus] = useState({ anim: "-", id: -1 });
  const [first, setFirst] = useState(true);
  let timeoutIdEnter: number;
  let timeoutIdLeave: number;

  const lineTitleFocusEnter = (index: number) => {
    if (!first && lineTitleFocus.id !== index) {
      clearTimeout(timeoutIdEnter);
      clearTimeout(timeoutIdLeave);
      timeoutIdEnter = setTimeout(() => {
        setLineTitleFocus({ anim: "focus", id: index });
      }, 250);
    }
  };

  const lineTitleFocusLeave = () => {
    if (!first && lineTitleFocus.id !== -1) {
      clearTimeout(timeoutIdEnter);
      clearTimeout(timeoutIdLeave);
      timeoutIdLeave = setTimeout(() => {
        setLineTitleFocus({ anim: "default", id: -1 });
        if (opacity === 1) setOpacity(0.35);
      }, 250);
    }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (isInView) {
      if (first && lineTitleFocus.anim !== "initial") setLineTitleFocus({ anim: "initial", id: -1 });
      const timeoutId = setTimeout(() => {
        if (first) {
          setLineTitleFocus({ anim: "default", id: -1 });
          setFirst(false);
        }
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [first, isInView]);

  function Line({ lineWithDetail, index, customLine }: { lineWithDetail: { title: string; detail: string }; index: number; customLine?: any }) {
    return (
      <motion.div
        animate={lineTitleFocus.id === index || lineTitleFocus.anim === "initial" ? lineTitleFocus.anim : "default"}
        {...(anim ? anim.lineContainer : {})}
        className={style.lineContainer}
      >
        <motion.span
          animate={
            lineTitleFocus.id === index || lineTitleFocus.anim === "initial" ? lineTitleFocus.anim : lineTitleFocus.id !== -1 ? "unfocus" : "default"
          }
          {...(anim ? anim.line(index) : {})}
          className={style.lineTitle}
          onMouseEnter={() => lineTitleFocusEnter(index)}
          onMouseLeave={() => lineTitleFocusLeave()}
          style={{ opacity: opacity }}
        >
          {customLine ? <>{customLine.childBefore}</> : <></>}
          {lineWithDetail.title}
          {customLine ? <>{customLine.childAfter}</> : <></>}
        </motion.span>
        <motion.p
          animate={lineTitleFocus.id === index || lineTitleFocus.anim === "initial" ? lineTitleFocus.anim : "default"}
          {...(anim ? anim.detail : {})}
          className={style.lineDetail}
        >
          {lineWithDetail.detail}
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className={style[className]} ref={ref}>
      {linesWithDetail.map((lwd, i) => {
        let customLine;
        if (customLines) customLine = customLines.find((cl) => cl.index === i);
        return <Line lineWithDetail={lwd} index={i} key={i} customLine={customLine} />;
      })}
    </div>
  );
}
