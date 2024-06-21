import style from "./WhoWeAre.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import Circle from "../../circle/Circle.module.tsx";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import Lines from "../../lines/Lines.tsx";
import PageNumber from "../../pagenumber/PageNumber.tsx";
import { RefObject, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

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
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.general.navigation(true) : null} />

      <WhoWeAreContent anim={isInView ? AnimCfg.whoWeAre.whoWeAreContent : null} />
    </section>
  );
}
