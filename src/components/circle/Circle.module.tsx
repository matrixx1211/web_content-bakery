import style from "./Circle.module.scss";
import { useMotionValue, useSpring } from "framer-motion";
import { MousePosition, useMouse } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { scrollToElementWithId } from "../helpers/Helpers.tsx";

export default function Circle({ id, anim, dark = false }: { id: string; anim: any; dark?: boolean }) {
  const [mouse, ref]: [mouse: MousePosition, ref: any] = useMouse();

  const circle = {
    x1: useMotionValue(0),
    y1: useMotionValue(0),
    x2: useMotionValue(0),
    y2: useMotionValue(0),
    x3: useMotionValue(0),
    y3: useMotionValue(0),
  };

  const smoothOptions1 = { damping: 20, stiffness: 500, mass: 0.1 };
  const smoothOptions2 = { damping: 20, stiffness: 150, mass: 0.1 };
  const smoothOptions3 = { damping: 20, stiffness: 300, mass: 0.1 };

  const circleSmooth = {
    x1: useSpring(circle.x1, smoothOptions1),
    y1: useSpring(circle.y1, smoothOptions1),
    x2: useSpring(circle.x2, smoothOptions2),
    y2: useSpring(circle.y2, smoothOptions2),
    x3: useSpring(circle.x3, smoothOptions3),
    y3: useSpring(circle.y3, smoothOptions3),
  };

  const handleMouse = () => {
    const halfSize = 44;
    if (
      mouse.elementX <= halfSize * 2 * 2 &&
      mouse.elementX >= -halfSize * 2 &&
      mouse.elementY <= halfSize * 2 * 2 &&
      mouse.elementY >= -halfSize * 2
    ) {
      circle.x1.set(mouse.elementX - 44);
      circle.y1.set(mouse.elementY - 44);
      circle.x2.set(mouse.elementX - 44);
      circle.y2.set(mouse.elementY - 44);
      circle.x3.set(mouse.elementX - 44);
      circle.y3.set(mouse.elementY - 44);
    }
  };

  /* TODO: Možná nepoužívat ref, ale použít vlastní hranice z ref */
  const reset = () => {
    circle.x1.set(0);
    circle.y1.set(0);
    circle.x2.set(0);
    circle.y2.set(0);
    circle.x3.set(0);
    circle.y3.set(0);
  };

  return (
    <motion.div
      className={style.circlesContainer}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      {...(anim ? anim.circleContainer : {})}
    >
      <a
        onClick={(e: MouseEvent) => {
          scrollToElementWithId(e, id);
        }}
        href={"#" + id}
        className={style.centerContainer}
        ref={ref}
      >
        <motion.div className={dark ? style.circleDark : style.circle} {...(anim ? anim.circle1(circleSmooth) : {})}></motion.div>
        <motion.div className={dark ? style.circleDark : style.circle} {...(anim ? anim.circle2(circleSmooth) : {})}></motion.div>
        <motion.div className={style.iconContainer} {...(anim ? anim.iconContainer(circleSmooth) : {})}>
          <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <motion.path
              fill={dark ? "#000000" : "#ffffff"}
              d="M12.5 18 2 7.707 2.707 7l9.793 9.586L22.293 7l.707.707L12.5 18z"
              {...(anim ? anim.icon : {})}
            />
          </svg>
        </motion.div>
      </a>
    </motion.div>
  );
}
