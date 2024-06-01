import style from "./Circle.module.css";
import { useScroll } from "framer-motion";

export default function Circle({ id, onClick }: {id: string, onClick?: () => void }) {
  const { scrollYProgress } = useScroll();
  console.log(scrollYProgress);
  const scrollDown = () => {
    scrollYProgress.set(0.250) ;
    console.log(scrollYProgress);
  }
  return (
    <a href={"#"+id} className={style.circleContainer} onClick={scrollDown}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
        <path fill="#ffffff" d="M12.5 18 2 7.707 2.707 7l9.793 9.586L22.293 7l.707.707L12.5 18z" />
      </svg>
    </a>
  );
}
