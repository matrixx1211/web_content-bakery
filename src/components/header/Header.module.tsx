import logoWithText from "../../assets/images/LogoWithText.svg";
import logo from "../../assets/images/Logo.svg";
import style from "./Header.module.css";
import { motion } from "framer-motion";

export default function Header({ onlyActive }: { onlyActive: boolean }) {
  return (
    <motion.header
      whileInView={{ scale: [0.5, 1] }}
      transition={{ type: "spring", stiffness: 100, duration: 2, delay: 0.2 }}
      className={`${style.header} area400`}
    >
      <img src={onlyActive ? logo : logoWithText} className={style.logo} alt={"logo"} />
      <span className={style.languageSelector}>CZ</span>
    </motion.header>
  );
}
