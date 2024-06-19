import { motion } from "framer-motion";
import logo from "../../assets/images/Logo.svg";
import style from "./Boarding.module.css";
import { BoardingAnimConfig } from "../../assets/config/BoardingAnim.config.tsx";

export default function Boarding() {
  return (
    <div className={style.boardingContainer}>
      <motion.img src={logo} className={style.loader} {...BoardingAnimConfig.loader} />
    </div>
  );
}
