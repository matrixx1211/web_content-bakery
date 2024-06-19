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
  const [random, setRandom] = useState({ x: 80, y: 70 });
  useEffect(() => {
    setRandom({ x: Math.random() * (95 - 55 + 1) + 65, y: Math.random() * (85 - 50 + 1) + 65 });
  }, []);

  return (
    <motion.img
      className={style.image}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={src}
      alt={src}
      animate={variant === "initial" ? "initial" : isFocused ? variant : "default"}
      {...anim.image({ x: x + random.x + "%", y: y + random.y + "%" })}
    />
  );
}
