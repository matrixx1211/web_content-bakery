import style from "./MobileContact.module.scss";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import MobileNavigation from "../components/mobileNavigation/MobileNavigation.module.tsx";
import Circle from "../../../circle/Circle.module.tsx";
import LinesByLetter from "../../../linesByLetter/LinesByLetter.tsx";

function ContactContent({ anim }: { anim: any }) {
  const topLines = ["WANT TO TAKE", "ADVANTAGE OF", "OUR SKILLS", "AND TOOLS?"];
  const bottomLines = ["JUST SEND US", "AN"];

  return (
    <>
      <div className={style.linesContainer}>
        <LinesByLetter lines={topLines} anim={anim ? anim.topLines : null} style={style} />
        <LinesByLetter
          lines={bottomLines}
          anim={anim ? anim.bottomLines : null}
          style={style}
          customLines={[
            {
              index: 1,
              childAfter: (
                <><a className={style.email} href="mailto:info@contentbakery.cz">
                  E-MAIL
                </a>.</>
              ),
            },
          ]}
        />
      </div>

      <Circle id="MobileIntro" anim={AnimCfg.general.circle(true)} direction="up"/>
    </>
  );
}

export default function MobileContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileContact" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <MobileNavigation onlyActive={false} anim={AnimCfg.mobile.general.navigation(false)} activePage={5} />

      <ContactContent anim={isInView ? AnimCfg.mobile.contact.contactContent : null} />
    </section>
  );
}
