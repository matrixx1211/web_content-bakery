import style from "./Contact.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Lines from "../../lines/Lines.tsx";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const topLines = ["WANT TO TAKE", "ADVANTAGE OF", "OUR SKILLS", "AND TOOLS?"];
  const bottomLines = ["JUST SEND US", "AN "];

  function ContactContent({ anim }: { anim: any }) {
    return (
      <>
        <div className={style.linesContainer}>
          <Lines lines={topLines} anim={anim ? anim.topLines : null} style={style} />
          <Lines
            lines={bottomLines}
            anim={anim ? anim.bottomLines : null}
            style={style}
            customLines={[{ index: 1, childAfter: <a className={style.email} href="mailto:info@contentbakery.cz">E-MAIL.</a> }]}
          />
        </div>
        <div></div>
      </>
    );
  }

  return (
    <section id="contact" className={`${style.contentContainer} contentContainer`} ref={ref}>
      <Header onlyActive={true} anim={isInView ? AnimCfg.general.header(true) : null} />
      <Navigation onlyActive={true} anim={isInView ? AnimCfg.general.navigation(true) : null} activePage={5} />

      <ContactContent anim={isInView ? AnimCfg.contact.contactContent : null} />
    </section>
  );
}
