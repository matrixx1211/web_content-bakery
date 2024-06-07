import style from "./Circle.module.scss";
import { useMotionValue, useSpring /*useScroll*/ } from "framer-motion";
import { MousePosition, useMouse } from "@uidotdev/usehooks";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Circle({ id /*onClick*/ }: { id: string; onClick?: () => void }) {
  /*const { scrollYProgress } = useScroll();
  console.log(scrollYProgress);
  const scrollDown = () => {
    scrollYProgress.set(0.25);
    console.log(scrollYProgress);
  };
  const ref = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };*/
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
  const [mouse, ref]: [mouse: MousePosition, ref: any] = useMouse();

  const handleMouse = () => {
    if (mouse.elementX * mouse.elementX + mouse.elementY * mouse.elementY < (176 - 44) * (176 - 44)) {
    }

    if (mouse.elementX <= (132*2) && mouse.elementX >= (-44*2) && mouse.elementY <= (132*2) && mouse.elementY >= (-44*2)) {
      circle.x1.set(mouse.elementX - 44);
      circle.y1.set(mouse.elementY - 44);
      circle.x2.set(mouse.elementX - 44);
      circle.y2.set(mouse.elementY - 44);
      circle.x3.set(mouse.elementX - 44);
      circle.y3.set(mouse.elementY - 44);
    } else {
      circle.x1.set(0);
      circle.y1.set(0);
      circle.x2.set(0);
      circle.y2.set(0);
      circle.x3.set(0);
      circle.y3.set(0);
    }
    /*x = mouse.elementX;
    y = mouse.elementY;*/
    console.log(mouse.elementX);
    console.log(mouse.elementY);
  };
  const reset = () => {
    circle.x1.set(0);
    circle.y1.set(0);
    circle.x2.set(0);
    circle.y2.set(0);
    circle.x3.set(0);
    circle.y3.set(0);
    console.log("leave");
  };

  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
      rotate: 0,
      scale: 0.5,
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)",
      rotate: 360,
      scale: 1.5,
    },
  };

  return (
    <div className={style.circlesContainer} onMouseMove={handleMouse} onMouseLeave={reset}>
      <a href={"#" + id} className={style.centerContainer} ref={ref}>
        <motion.div style={{ x: circleSmooth.x1, y: circleSmooth.y1 }} className={style.circle}></motion.div>
        <motion.div style={{ x: circleSmooth.x2, y: circleSmooth.y2 }} className={style.circle}></motion.div>
        <motion.div style={{ x: circleSmooth.x3, y: circleSmooth.y3 }} className={style.iconContainer}>
          <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <motion.path
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5, duration: 0.5 }}
              fill="#ffffff"
              d="M12.5 18 2 7.707 2.707 7l9.793 9.586L22.293 7l.707.707L12.5 18z"
            />
          </svg>
        </motion.div>
      </a>
    </div>
  );
}

/*{/!*<motion.div
        className={style.circleContainer}
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x, y }}
        style={{x: x, y: y}}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <a href={"#" + id} className={style.circleStatic}>
          <svg className={style.circleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path fill="#ffffff" d="M12.5 18 2 7.707 2.707 7l9.793 9.586L22.293 7l.707.707L12.5 18z" />
          </svg>
        </a>
        <span className={style.circleDynamic}></span>
      </motion.div>*!/}
{/!* <div className={style.circleContainer}>
        <a href={"#" + id} className={style.circleStatic} onClick={scrollDown}>
          <svg className={style.circleIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
            <path fill="#ffffff" d="M12.5 18 2 7.707 2.707 7l9.793 9.586L22.293 7l.707.707L12.5 18z" />
          </svg>
        </a>
        <span className={style.circleDynamic}></span>
      </div>*!/}*/
