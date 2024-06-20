import { motion } from "framer-motion";
import style from "../Intro.module.scss";
import { useEffect, useState } from "react";
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

export default function FocusableImage({
  src,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
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
      onMouseLeave={onMouseLeave}
      src={src}
      alt={src}
      style={{ ...pos }}
      animate={variant === "initial" ? "initial" : isFocused ? variant : "default"}
      {...anim.focusableImage()}
    />
  );
}
