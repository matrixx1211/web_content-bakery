import style from "./Cursor.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [clicked, setClicked] = useState(false);
  const [showed, setShowed] = useState(false);
  const cursorSize = 24;

  const mouse = {
    x: useMotionValue(-20),
    y: useMotionValue(-20),
  };

  const smoothOptions = { damping: 20, stiffness: 500, mass: 0.1 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e: any) => {
    if (!showed) setShowed(true);
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mousedown", () => setClicked(true));
    window.addEventListener("mouseup", () => setClicked(false));
    window.addEventListener("mouseover", () => setShowed(true));
    window.addEventListener("mouseout", () => setShowed(false));

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", () => setClicked(true));
      window.removeEventListener("mouseup", () => setClicked(false));
      window.removeEventListener("mouseenter", () => setShowed(true));
      window.removeEventListener("mouseleave", () => setShowed(false));
    };
  }, []);

  const variants = {
    default: { scale: 1.25 },
    clicked: { scale: 1 },
  };
  const topVariants = { default: { x: 0, y: 0 }, clicked: { x: 0, y: 2 } };
  const rightVariants = { default: { x: 0, y: 0 }, clicked: { x: -2, y: 0 } };
  const bottomVariants = { default: { x: 0, y: 0 }, clicked: { x: 0, y: -2 } };
  const leftVariants = { default: { x: 0, y: 0 }, clicked: { x: 2, y: 0 } };
  const variantAnim = clicked ? "clicked" : "default";
  return (
    <motion.div
      className={style.cursor}
      style={{ top: smoothMouse.y, left: smoothMouse.x, opacity: showed ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      variants={variants}
      animate={variantAnim}
    >
      <motion.span className={style.top} variants={topVariants} animate={variantAnim}></motion.span>
      <motion.span className={style.right} variants={rightVariants} animate={variantAnim}></motion.span>
      <motion.span className={style.bottom} variants={bottomVariants} animate={variantAnim}></motion.span>
      <motion.span className={style.left} variants={leftVariants} animate={variantAnim}></motion.span>
    </motion.div>
  );
}
