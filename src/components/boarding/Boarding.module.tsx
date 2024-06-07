import { motion } from "framer-motion";
import logo from "../../assets/images/Logo.svg";
import style from "./Boarding.module.css";

export default function Boarding() {
  return (
    <div className={style.boardingContainer}>
      <motion.img
        src={logo}
        className={style.loader}
        animate={{ rotate: [0, 360], scale: [1, 0.3] }}
        transition={{ type: "spring", stiffness: 60, duration: 1 }}
      />
    </div>
  );
}
