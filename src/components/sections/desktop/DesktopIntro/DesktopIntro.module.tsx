import style from "./DesktopIntro.module.scss";
import Header from "../../../header/Header.module.tsx";
import Circle from "../../../circle/Circle.module.tsx";
import Navigation from "../../../navigation/Navigation.module.tsx";
import PageNumber from "../../../pagenumber/PageNumber.tsx";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import { useEffect, useState } from "react";
import notino from "../../../../assets/images/notino.jpg";
import livestreaming from "../../../../assets/images/livestreaming.jpg";
import richly from "../../../../assets/images/richly.jpg";
import kresleni from "../../../../assets/images/kresleni.jpg";
import { motion } from "framer-motion";

type FocusableImageType = {
  src: string;
  x: string;
  y: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isFocused: boolean;
  variant: string;
  anim: any;
};

function FocusableImage({ src, x, y, onMouseEnter, onMouseLeave, isFocused, variant, anim }: FocusableImageType) {
  const [random, setRandom] = useState({ x: 10, y: 10, mt: 100, mb: 200 });
  const intervalX = { min: 15, max: 25 };
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

  return (
    <motion.img
      className={style.focusableImage}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={src}
      alt=""
      style={{ ...pos }}
      animate={variant === "initial" ? "initial" : isFocused ? variant : "default"}
      {...(anim ? anim.focusableImage() : {})}
    />
  );
}

function FocusableLines({ imageFocus, anim }: { imageFocus: any; anim: any }) {
  const lines = ["WE ARE", "MODERN", "DIGITAL", "FACTORY", "THAT HELPS", "TO OPTIMIZE,", "MODERNIZE", "AND GROW."];

  function Line({ text, index }: { text: string; index: number }) {
    return (
      <div>
        <motion.span animate={imageFocus.anim} {...(anim ? anim.line(index) : {})} className={style.introTextLine}>
          {text}
        </motion.span>
      </div>
    );
  }

  return (
    <motion.div {...(anim ? anim.introText(imageFocus.image >= 0) : {})} className={style.introText}>
      {lines.map((line, i) => (
        <Line text={line} index={i} key={i} />
      ))}
    </motion.div>
  );
}

function IntroContent({ anim }: { anim: any }) {
  const [first, setFirst] = useState(true);
  const [imageFocus, setImageFocus] = useState({ anim: "initial", image: -1 });
  let timeoutIdEnter: number;
  let timeoutIdLeave: number;
  const imageFocusEnter = (index: number) => {
    if (!first && imageFocus.image !== index) {
      clearTimeout(timeoutIdEnter);
      clearTimeout(timeoutIdLeave);
      timeoutIdEnter = setTimeout(() => {
        setImageFocus({ anim: "focus", image: index });
      }, 50);
    }
  };
  const imageFocusLeave = () => {
    if (!first && imageFocus.image !== -1) {
      clearTimeout(timeoutIdEnter);
      clearTimeout(timeoutIdLeave);
      timeoutIdLeave = setTimeout(() => {
        setImageFocus({ anim: "default", image: -1 });
      }, 250);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (first) {
        setImageFocus({ anim: "afterLoad", image: -1 });
        setFirst(false);
      }
    }, 1400);

    return () => clearTimeout(timeoutId);
  }, [first]);

  const images = [
    { src: notino, x: "-", y: "-" },
    { src: livestreaming, x: "+", y: "-" },
    { src: richly, x: "-", y: "+" },
    { src: kresleni, x: "+", y: "+" },
  ];

  return (
    <>
      <PageNumber number="01" anim={anim ? anim.pageNumber : null} style={style} />
      <FocusableLines imageFocus={imageFocus} anim={anim ? anim.lines : null} />

      {images.map((image, index) => {
        return (
          <FocusableImage
            {...image}
            isFocused={imageFocus.image === index}
            variant={imageFocus.anim}
            onMouseEnter={() => imageFocusEnter(index)}
            onMouseLeave={imageFocusLeave}
            key={index}
            anim={anim ? anim.focusableImage : null}
          />
        );
      })}

      <Circle id="Before-DesktopWhoWeAre" anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function DesktopIntro() {
  return (
    <section id="DesktopIntro" className={style.contentContainer + " contentContainer"}>
      <Header onlyActive={false} anim={AnimCfg.general.header(true)} />
      <Navigation onlyActive={false} anim={AnimCfg.general.navigation(true)} activePage={1} />

      <IntroContent anim={AnimCfg.desktop.intro.introContent} />
    </section>
  );
}
