import style from "./DesktopContact.module.scss";
import DesktopHeader from "../../../sections/desktop/components/desktopHeader/DesktopHeader.module.tsx";
import Navigation from "../../../sections/desktop/components/desktopNavigation/DesktopNavigation.module.tsx";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Lines from "../../../lines/Lines.tsx";

function ContactContent({ anim }: { anim: any }) {
  const topLines = ["WANT TO TAKE", "ADVANTAGE OF", "OUR SKILLS", "AND TOOLS?"];
  const bottomLines = ["JUST SEND US", "AN "];

  return (
    <>
      <div className={style.linesContainer}>
        <Lines lines={topLines} anim={anim ? anim.topLines : null} style={style} />
        <Lines
          lines={bottomLines}
          anim={anim ? anim.bottomLines : null}
          style={style}
          customLines={[
            {
              index: 1,
              childAfter: (
                <a className={style.email} href="mailto:info@contentbakery.cz">
                  E-MAIL.
                </a>
              ),
            },
          ]}
        />
      </div>
      <div className={style.spacer}></div>
    </>
  );
}

export default function DesktopContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="DesktopContact" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <DesktopHeader onlyActive={true} anim={isInView ? AnimCfg.desktop.general.header(true) : null} />
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.desktop.general.navigation(true) : null} activePage={5} />

      <ContactContent anim={isInView ? AnimCfg.desktop.contact.contactContent : null} />
    </section>
  );
}
