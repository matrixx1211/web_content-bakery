import style from "./DesktopOurTools.module.scss";
import DesktopHeader from "../../../sections/desktop/components/desktopHeader/DesktopHeader.module.tsx";
import Navigation from "../../../sections/desktop/components/desktopNavigation/DesktopNavigation.module.tsx";
import Circle from "../../../circle/Circle.module.tsx";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import PageNumber from "../../../pagenumber/PageNumber.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Lines from "../../../lines/Lines.tsx";

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
        <Lines anim={anim ? anim.bigLines : null} lines={bigLines} style={style} className="bigLinesText" />
        <PageNumber number="04" anim={anim ? anim.pageNumber : null} style={style} />
        <Lines anim={anim ? anim.smallLines : null} lines={smallLines} style={style} className="smallLinesText" />
      </div>

      <Circle id="DesktopOurTools2" dark={true} anim={AnimCfg.general.circle(true)} />
    </>
  );
}
export default function DesktopOurTools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="DesktopOurTools" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <DesktopHeader onlyActive={true} anim={isInView ? AnimCfg.desktop.general.header(true) : null} dark={true} />
      <Navigation
        onlyActive={true}
        anim={isInView ? AnimCfg.desktop.general.navigation(true) : null}
        activePage={4}
        dark={true}
      />

      <OurToolsContent anim={isInView ? AnimCfg.desktop.ourTools.ourToolsContent : null} />
    </section>
  );
}
