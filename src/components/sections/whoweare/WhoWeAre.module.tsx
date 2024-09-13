import style from "./WhoWeAre.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import Circle from "../../circle/Circle.module.tsx";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import PageNumber from "../../pagenumber/PageNumber.tsx";
import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * @description vykreslí řádky z pole a přidá jim animaci a styl
 * @param anim animace řádků musí být v property .line
 * @param lines pole řádků
 * @param style styl řádku musí být .className { .lineText {} }
 * @param className ve výchozím stavu "linesText"
 * @param customLines vlastní řádek s tagem
 */
function Lines({
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
  function Line({ text, index, customLine }: { text: string; index: number; customLine?: any }) {
    return (
      <div key={index}>
        <motion.span {...(anim ? anim.line(index) : {})} className={style.lineText}>
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

function WhoWeAreContent({ anim }: { anim: any }) {
  const bigLines = [
    "DIFFERENT",
    "PERSPECTIVES",
    "AND ONE VISION:",
    "TO FIND",
    "A COMPLEX",
    "SOLUTION",
    "THAT KEEPS IT",
    "SIMPLE.",
  ];

  const smallLines = [
    "We are independent marketing agency based in",
    "Prague that helps brands and companies find new",
    "and effective solutions in the preparation and",
    "creation of communication content.",
  ];

  return (
    <>
      <div className={style.content}>
        <Lines anim={anim ? anim.bigLines : null} lines={bigLines} style={style} className="bigLinesText" />
        <PageNumber number="02" anim={anim ? anim.pageNumber : null} style={style} />
        <Lines anim={anim ? anim.smallLines : null} lines={smallLines} style={style} className="smallLinesText" />
      </div>

      <Circle id="before-whatwedo" anim={AnimCfg.general.circle(true)} />
    </>
  );
}
export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="whoweare" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <Header onlyActive={true} anim={isInView ? AnimCfg.general.header(true) : null} />
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.general.navigation(true) : null} activePage={2} />

      <WhoWeAreContent anim={isInView ? AnimCfg.whoWeAre.whoWeAreContent : null} />
    </section>
  );
}
