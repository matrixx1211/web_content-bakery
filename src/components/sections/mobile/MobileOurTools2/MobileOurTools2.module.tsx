import style from "./MobileOurTools2.module.scss";
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
      title: "BAKERY APP",
      detail:
        "An efficient way how to process digital campaigns, preparing all formats, language mutations and assets in a simple and streamlined workflow that saves time and costs.",
    },
    {
      id: 1,
      title: "PRESS HUB",
      detail:
        "A comprehensive and easy-to-understand tool for managing communications with journalists and PR, which remains clear even when many different brands are managed at the same time.",
    },
  ];

  return (
    <>
      <div className={style.linesOnSideContainer}>
        {linesWithDetail.map((l, i) => (
          <LineOnSide data={l} key={i} anim={anim ? anim.linesOnSide : null} />
        ))}
      </div>

      <Circle id="MobileOurTools3" anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function MobileOurTools2() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileOurTools2" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <MobileNavigation onlyActive={false} anim={AnimCfg.mobile.general.navigation(false)} activePage={4} />

      <OurTools2Content anim={isInView ? AnimCfg.mobile.ourTools2.ourTools2Content : null} />
    </section>
  );
}
