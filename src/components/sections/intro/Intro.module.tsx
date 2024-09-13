import style from "./Intro.module.scss";
import Header from "../../header/Header.module.tsx";
import Circle from "../../circle/Circle.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import PageNumber from "../../pagenumber/PageNumber.tsx";
import { AnimCfg } from "../../../assets/config/AnimCfg.tsx";
import { useEffect, useState } from "react";
import notino from "../../../assets/images/notino.jpg";
import livestreaming from "../../../assets/images/livestreaming.jpg";
import richly from "../../../assets/images/richly.jpg";
import kresleni from "../../../assets/images/kresleni.jpg";
import { motion } from "framer-motion";

type FocusableImageType = {
  src: string;
  x: string;
  y: string;
  onMouseEnter: () => void;
  onMouseMove: () => void;
  onMouseLeave: () => void;
  isFocused: boolean;
  variant: string;
  anim: any;
};

function FocusableImage({
  src,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  isFocused,
  variant,
  anim,
}: FocusableImageType) {
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
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      src={src}
      alt={src}
      style={{ ...pos }}
      animate={variant === "initial" ? "initial" : isFocused ? variant : "default"}
      {...anim.focusableImage()}
    />
  );
}

function FocusableLines({ imageFocus, anim }: { imageFocus: any; anim: any }) {
  const lines = ["WE ARE", "MODERN", "DIGITAL", "FACTORY", "THAT HELPS", "TO OPTIMIZE,", "MODERNIZE", "AND GROW."];

  function Line({ text, index }: { text: string; index: number }) {
    return (
      <div>
        <motion.span animate={imageFocus.anim} {...anim.line(index)} className={style.introTextLine}>
          {text}
        </motion.span>
      </div>
    );
  }

  return (
    <motion.div {...anim.introText(imageFocus.image >= 0)} className={style.introText}>
      {lines.map((line, i) => (
        <Line text={line} index={i} key={i} />
      ))}
    </motion.div>
  );
}

function IntroContent({ anim }: { anim: any }) {
  const [first, setFirst] = useState(true);
  const [imageFocus, setImageFocus] = useState({ anim: "initial", image: -1, disabled: true });
  const imageFocusEnter = (index: number) => {
    if (!imageFocus.disabled) setImageFocus({ anim: "focus", image: index, disabled: false });
  };
  const imageFocusLeave = () => {
    if (!imageFocus.disabled) setImageFocus({ anim: "default", image: -1, disabled: false });
  };

  const onMouseMove = (index: number) => {
    if (imageFocus.anim === "default") setImageFocus({ anim: "focus", image: index, disabled: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (first) {
        setImageFocus({ anim: "default", image: -1, disabled: false });
        setFirst(false);
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [imageFocus]);

  const images = [
    { src: notino, x: "-", y: "-" },
    { src: livestreaming, x: "+", y: "-" },
    { src: richly, x: "-", y: "+" },
    { src: kresleni, x: "+", y: "+" },
  ];

  return (
    <>
      <PageNumber number="01" anim={anim.pageNumber} style={style} />
      <FocusableLines imageFocus={imageFocus} anim={anim.lines} />

      {images.map((image, index) => {
        const data = {
          ...image,
          isFocused: imageFocus.image === index,
          onMouseEnter: () => imageFocusEnter(index),
          onMouseMove: () => onMouseMove(index),
          onMouseLeave: imageFocusLeave,
          variant: imageFocus.anim,
        };
        return <FocusableImage {...data} key={index} anim={anim.focusableImage} />;
      })}

      <Circle id="before-whoweare" anim={AnimCfg.general.circle(false)} />
    </>
  );
}

export default function Intro() {
  return (
    <section id="intro" className={style.contentContainer + " contentContainer"}>
      <Header onlyActive={false} anim={AnimCfg.general.header(false)} />
      <Navigation onlyActive={false} anim={AnimCfg.general.navigation(false)} activePage={1} />

      <IntroContent anim={AnimCfg.intro.introContent} />
    </section>
  );
}
