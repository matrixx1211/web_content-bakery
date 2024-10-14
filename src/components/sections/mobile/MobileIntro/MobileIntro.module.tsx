import style from "./MobileIntro.module.scss";
import Circle from "../../../circle/Circle.module.tsx";
import PageNumber from "../../../pagenumber/PageNumber.tsx";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import { useEffect, useState, useRef } from "react";
import notino from "../../../../assets/images/notino.jpg";
import livestreaming from "../../../../assets/images/livestreaming.jpg";
import richly from "../../../../assets/images/richly.jpg";
import kresleni from "../../../../assets/images/kresleni.jpg";
import { motion, useInView } from "framer-motion";
import MobileNavigation from "../components/mobileNavigation/MobileNavigation.module.tsx";
import LinesByLetter from "../../../linesByLetter/LinesByLetter.tsx";

function FocusableImage({ src, x, y, anim }: { src: string; x: string; y: string; anim: any }) {
  const [random, setRandom] = useState({ x: 10, y: 10, mt: 100, mb: 200 });
  const intervalX = { min: window.innerWidth > 800 ? 15 : 0, max: window.innerWidth > 800 ? 25 : 0 };
  const intervalY = { min: 15, max: 25 };
  const intervalMarginTop = { min: 100, max: 150 };
  const intervalMarginBottom = { min: 180, max: 220 };

  useEffect(() => {
    setRandom({
      x: Math.random() * (intervalX.max - intervalX.min + 1) + intervalX.min,
      y: Math.random() * (intervalY.max - intervalY.min + 1) + intervalY.min,
      mt: Math.random() * (intervalMarginTop.max - intervalMarginTop.min + 1) + intervalMarginTop.min,
      mb: Math.random() * (intervalMarginBottom.max - intervalMarginBottom.min + 1) + intervalMarginBottom.min,
    });
  }, []);

  const pos = {
    top: y.includes("-") ? `0` : "auto",
    marginTop: y.includes("-") ? `${random.mt}px` : "auto",
    bottom: y.includes("+") ? `0` : "auto",
    marginBottom: y.includes("+") ? `${random.mb}px` : "auto",
    left: x.includes("-") ? `${random.x}%` : "auto",
    right: x.includes("+") ? `${random.x}%` : "auto",
  };

  return <motion.img className={style.focusableImage} src={src} alt="" style={{ ...pos }} {...(anim ? anim.focusableImage() : {})} />;
}

function IntroContent({ anim }: { anim: any }) {
  const images = [
    { src: notino, x: "-", y: "-" },
    { src: livestreaming, x: "+", y: "-" },
    { src: richly, x: "-", y: "+" },
    { src: kresleni, x: "+", y: "+" },
  ];
  const lines = ["WE ARE", "MODERN", "DIGITAL", "FACTORY", "THAT HELPS", "TO OPTIMIZE,", "MODERNIZE", "AND GROW."];

  return (
    <>
      <div className={style.content}>
        <PageNumber number="01" anim={anim ? anim.pageNumber : null} style={style} />
        <div>
          {images.map((image, index) => {
            return <FocusableImage {...image} key={index} anim={anim ? anim.focusableImage : null} />;
          })}
        </div>
        <LinesByLetter anim={anim ? anim.lines : null} lines={lines} style={style} />
      </div>

      <Circle id="Before-MobileWhoWeAre" anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function MobileIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileIntro" className={style.contentContainer + " contentContainer"} ref={ref}>
      <MobileNavigation onlyActive={false} anim={isInView ? AnimCfg.mobile.general.navigation(false) : null} activePage={1} />

      <IntroContent anim={isInView ? AnimCfg.mobile.intro.introContent : null} />
    </section>
  );
}
