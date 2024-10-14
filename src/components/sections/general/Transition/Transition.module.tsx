import style from "./Transition.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { scrollToElementWithId } from "../../../helpers/Helpers.tsx";
import { motion, useInView } from "framer-motion";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";

export default function Transition({
  toId,
  pageTitle,
  pageNumber,
  nextSectionId
}: {
  toId: string;
  pageTitle: string;
  pageNumber: string;
  nextSectionId: string;
}) {
  const id = "#" + nextSectionId;
  const location = useLocation();
  const anim = AnimCfg.general.transition;
  const [animState, setAnimState] = useState("enter");
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    if (id && location && location.hash === id.replace("#", "#Before-")) {
      setAnimState("enter");
      const timeoutId1 = setTimeout(() => {
        setAnimState("leave");
      }, 1500);

      const timeoutId2 = setTimeout(() => {
        scrollToElementWithId(null, id, 1000);
      }, 2000);

      const timeoutId3 = setTimeout(() => {
        setAnimState("enter");
      }, 3000);

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
        clearTimeout(timeoutId3);
      };
    }
  }, [id, location]);
  return (
    <section id={toId} className={`${style.transitionContainer} transitionContainer`} ref={ref}>
      <motion.div className={style.transitionText} animate={animState} {...(isInView ? anim.transitionText : {})}>
        <span className={style.pageNumber}>{pageNumber}</span>
        <span className={style.pageTitle}> {pageTitle}</span>
      </motion.div>
    </section>
  );
}
