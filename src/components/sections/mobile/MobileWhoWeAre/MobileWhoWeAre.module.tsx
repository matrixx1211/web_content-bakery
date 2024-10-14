import style from "./MobileWhoWeAre.module.scss";
import Circle from "../../../circle/Circle.module.tsx";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import PageNumber from "../../../pagenumber/PageNumber.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import MobileNavigation from "../components/mobileNavigation/MobileNavigation.module.tsx";
import LinesByLetter from "../../../linesByLetter/LinesByLetter.tsx";

function WhoWeAreContent({ anim }: { anim: any }) {
  const bigLines = ["DIFFERENT", "PERSPECTIVES", "AND ONE VISION:", "TO FIND", "A COMPLEX", "SOLUTION", "THAT KEEPS IT", "SIMPLE."];

  const smallLines = [
    "We are independent marketing agency based in",
    "Prague that helps brands and companies find new",
    "and effective solutions in the preparation and",
    "creation of communication content.",
  ];

  return (
    <>
      <div className={style.content}>
        <LinesByLetter anim={anim ? anim.bigLines : null} lines={bigLines} style={style} className="bigLinesText" />
        <PageNumber number="02" anim={anim ? anim.pageNumber : null} style={style} />
        <LinesByLetter anim={anim ? anim.smallLines : null} lines={smallLines} style={style} className="smallLinesText" />
      </div>

      <Circle id="Before-MobileWhatWeDo" anim={AnimCfg.general.circle(true)} />
    </>
  );
}
export default function MobileWhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileWhoWeAre" className={`${style.contentContainer} contentContainer`} ref={ref} style={{ overflow: "hidden" }}>
      <MobileNavigation onlyActive={false} anim={AnimCfg.mobile.general.navigation(false)} activePage={2} />

      <WhoWeAreContent anim={isInView ? AnimCfg.mobile.whoWeAre.whoWeAreContent : null} />
    </section>
  );
}
