import style from "./MobileOurTools3.module.scss";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import Circle from "../../../circle/Circle.module.tsx";
import MobileNavigation from "../components/mobileNavigation/MobileNavigation.module.tsx";
import LinesByLetter from "../../../linesByLetter/LinesByLetter.tsx";

function LineOnSide({ data, anim }: { data: { id: number; title: string; detail: string }; anim: any }) {
  return (
    <>
      <LinesByLetter anim={anim ? anim.bigLines : null} lines={[data.title]} style={style} className={data.id % 2 === 0 ? "bigLinesLeftText" : "bigLinesRightText"} />
      <LinesByLetter anim={anim ? anim.smallLines : null} lines={[data.detail]} style={style} className={data.id % 2 === 0 ? "smallLinesLeftText" : "smallLinesRightText"} />
    </>
  );
}

function OurTools2Content({ anim }: { anim: any }) {
  const linesWithDetail = [
    {
      id: 0,
      title: "CONTENT BOX",
      detail: "Smart solution for e-comm content creation, management and sharing.",
    },
    {
      id: 1,
      title: "STREAM BOX",
      detail: "A simple and convenient way to present information to a closed audience, invite them and interact with them in a live chat.",
    },
    {
      id: 2,
      title: "RICHLY",
      detail: "Simple and efficent app for automated creation of rich content for Notino e-shop using predefined templates.",
    },
  ];

  return (
    <>
      <div className={style.linesOnSideContainer}>
        {linesWithDetail.map((l, i) => (
          <LineOnSide data={l} key={i} anim={anim ? anim.linesOnSide : null}/>
        ))}
      </div>
      <Circle id="Before-MobileContact" anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function MobileOurTools3() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileOurTools3" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <MobileNavigation onlyActive={false} anim={AnimCfg.mobile.general.navigation(false)} activePage={4} />

      <OurTools2Content anim={isInView ? AnimCfg.mobile.ourTools2.ourTools2Content : null} />
    </section>
  );
}
