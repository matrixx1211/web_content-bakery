import style from "./WhatWeDo.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import Circle from "../../circle/Circle.module.tsx";
import LinesWithDetail from "../../linesWithDetail/LinesWithDetail.tsx";

function WhatWeDoContent({ anim }: { anim: any }) {
  const linesWithDetail = [
    {
      id: 0,
      title: "CONTENT ADAPTATIONS",
      detail:
        "Adapting global campaigns to local markets doesn’t have to be a headache. With smart, original tools, streamlined processes, and an experienced team, we make it smooth, fast, and cost-effective.",
    },
    {
      id: 1,
      title: "PHOTOS & VIDEOS",
      detail:
        "From polished packshots to eye-catching social media content, all the way to creatively tailored campaigns that connect themes across the online universe. We bring ideas to life in images and video that speak volumes.",
    },
    {
      id: 2,
      title: "WEBS & APPS",
      detail:
        "Communication that engages, easy and clear information sharing, tools for reaching out to customers, employees, or journalists, and even incorporating game elements into B2B communication. We seek elegant and maximally simple ways to utilize the natural potential of the online environment since we all carry it in our pockets nowadays.",
    },
    {
      id: 3,
      title: "CHATBOTS & AI",
      detail:
        "Why not use cleverly designed, entertaining, tireless, and always-ready companions for communicating topics on social media? They can happily introduce new products, advise on choosing and using the right products, or even handle an entire Instagram competition with thousands of participants 24/7.",
    },
    {
      id: 4,
      title: "LIVE STREAMS",
      detail:
        "Sometimes it’s just easier not to force everyone to arrive at one place at the same time just to share a few pieces of information or show what’s coming next. Online can often be not only more convenient and cheaper but also more interesting and better organized, especially when using a platform that helps invite only the right people.",
    },
    {
      id: 5,
      title: "STAFF AUGMENTATION",
      detail:
        "If you occasionally need to replace some team members or temporarily increase their capacities, we can help. Whether it’s a one-time or systematic support.",
    },
  ];

  return (
    <>
      <LinesWithDetail anim={anim ? anim.linesWithDetail : null} linesWithDetail={linesWithDetail} style={style} />
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
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.general.navigation(true) : null} activePage={3} />

      <WhatWeDoContent anim={isInView ? AnimCfg.whatWeDo.whatWeDoContent : null} />
    </section>
  );
}
