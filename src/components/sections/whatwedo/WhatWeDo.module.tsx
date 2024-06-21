import style from "./WhatWeDo.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import Circle from "../../circle/Circle.module.tsx";
import Lines from "../../lines/Lines.tsx";

/*
Udělat jako řádky a při najetí na text zobrazit absolutní div o šírce textu nad tím
*/
function LinesWithImages() {
  function LineWithImage() {
    return <></>;
  }

  return <></>;
}

function WhatWeDoContent({ anim }: { anim: any }) {
  const lines = [
    "WEB & APP",
    "PHOTO & VIDEO",
    "CHATBOT",
    "LIVESTREAM",
    "AI & MACHINE LEARNING",
    "CONTENT ADAPTATION",
    "STAFF AUGMENTATION",
  ];

  return (
    <>
      <Lines anim={anim ? anim.linesText : null} lines={lines} style={style} />
      <Circle id={"before-ourtools"} anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="whatwedo" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <Header onlyActive={true} anim={isInView ? AnimCfg.general.header(true) : null} />
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.general.navigation(true) : null} />

      <WhatWeDoContent anim={isInView ? AnimCfg.whatWeDo.whatWeDoContent : null} />
    </section>
  );
}
