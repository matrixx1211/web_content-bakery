import style from "./OurTools2.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import Circle from "../../circle/Circle.module.tsx";
import LinesWithDetail from "../../linesWithDetail/LinesWithDetail.tsx";

function OurTools2Content({ anim }: { anim: any }) {
  const linesWithDetail = [
    {
      id: 0,
      title: "Bakery App",
      detail:
        "An efficient way how to process digital campaigns, preparing all formats, language mutations and assets in a simple and streamlined workflow that saves time and costs.",
    },
    {
      id: 1,
      title: "ContentBox",
      detail: "Smart solution for e-comm content creation, management and sharing.",
    },
    {
      id: 2,
      title: "StreamBox",
      detail:
        "A simple and convenient way to present information to a closed audience, invite them and interact with them in a live chat.",
    },
    {
      id: 3,
      title: "Richly",
      detail:
        "Simple and efficent app for automated creation of rich content for Notino e-shop using predefined templates.",
    },
    {
      id: 4,
      title: "PressHub",
      detail:
        "A comprehensive and easy-to-understand tool for managing communications with journalists and PR, which remains clear even when many different brands are managed at the same time.",
    },
  ];

  return (
    <>
      <LinesWithDetail anim={anim ? anim.linesWithDetail : null} linesWithDetail={linesWithDetail} style={style} />
      <Circle id="before-contact" dark={true} anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function OurTools2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="ourtools2" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <Header onlyActive={true} anim={isInView ? AnimCfg.general.header(true) : null} dark={true}/>
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.general.navigation(true) : null} activePage={4} dark={true}/>

      <OurTools2Content anim={isInView ? AnimCfg.ourTools2.ourTools2Content : null} />
    </section>
  );
}
