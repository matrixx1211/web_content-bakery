import { motion } from "framer-motion";
import style from "../Intro.module.scss";
import { useEffect, useState } from "react";

export default function FocusableImage({
  src,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  isFocused,
  variant,
  anim,
}: {
  src: string;
  x: string;
  y: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isFocused: boolean;
  variant: string;
  anim: any;
}) {
  const [random, setRandom] = useState({ x: 80, y: 70 });
  const [delay, setDelay] = useState(0);
  useEffect(() => {
    setRandom({ x: Math.random() * (95 - 70 + 1) + 55, y: Math.random() * (85 - 65 + 1) + 55 });
    setDelay(Math.random() / 2);
  }, []);
  return (
    <motion.img
      className={style.image}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      src={src}
      alt={src}
      animate={variant === "initial" ? "initial" : isFocused ? variant : "default"}
      {...anim.image({ x: x + random.x + "%", y: y + random.y + "%", delay })}
    />
  );
}
