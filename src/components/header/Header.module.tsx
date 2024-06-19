import logoWithText from "../../assets/images/LogoWithText.svg";
import logo from "../../assets/images/Logo.svg";
import style from "./Header.module.scss";
import { motion } from "framer-motion";

export default function Header({ onlyActive, anim }: { onlyActive: boolean; anim?: any }) {
  return (
    <motion.header
      className={style.headerContainer}
      {...(anim ? anim.headerContainer : {})}
    >
      <img src={onlyActive ? logo : logoWithText} className={style.logo} alt={"logo"} />
      <span style={{ opacity: onlyActive ? 0 : 1 }} className={style.languageSelector}>
        CZ
      </span>
    </motion.header>
  );
}
