import style from "./MobileOurTools.module.scss";
import Circle from "../../../circle/Circle.module.tsx";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import PageNumber from "../../../pagenumber/PageNumber.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import MobileNavigation from "../components/mobileNavigation/MobileNavigation.module.tsx";
import LinesByLetter from "../../../linesByLetter/LinesByLetter.tsx";

function OurToolsContent({ anim }: { anim: any }) {
  const bigLines = ["OUR TOOLS", "THAT HELPS", "TO CREATE, SHARE", "AND ORGANIZE"];

  const smallLines = [
    "With our in-house tools we help you",
    "easily create and distribute effective",
    "content, create mutations and tailor",
    "manage your communication in 360.",
  ];

  return (
    <>
      <div className={style.content}>
        <LinesByLetter anim={anim ? anim.bigLines : null} lines={bigLines} style={style} className="bigLinesText" />
        <PageNumber number="04" anim={anim ? anim.pageNumber : null} style={style} />
        <LinesByLetter anim={anim ? anim.smallLines : null} lines={smallLines} style={style} className="smallLinesText" />
      </div>

      <Circle id="MobileOurTools2" anim={AnimCfg.general.circle(true)} />
    </>
  );
}
export default function MobileOurTools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileOurTools" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <MobileNavigation onlyActive={false} anim={AnimCfg.mobile.general.navigation(false)} activePage={4} />

      <OurToolsContent anim={isInView ? AnimCfg.mobile.ourTools.ourToolsContent : null} />
    </section>
  );
}
