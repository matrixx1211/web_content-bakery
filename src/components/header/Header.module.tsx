import style from "./Header.module.scss";
import logoWithText from "../../assets/images/LogoWithText.svg";
import logo from "../../assets/images/Logo.svg";
import { motion } from "framer-motion";
import { scrollToElementWithId } from "../helpers/Helpers.tsx";

export default function Header({ onlyActive, anim }: { onlyActive: boolean; anim?: any }) {
  return (
    <motion.header
      className={style.headerContainer}
      {...(anim ? anim.headerContainer : {})}
      onClick={() => scrollToElementWithId(null, "intro")}
    >
      <img src={onlyActive ? logo : logoWithText} className={style.logo} alt="logo" />
      <span style={{ opacity: onlyActive ? 0 : 1 }} className={style.languageSelector}>
        CZ
      </span>
    </motion.header>
  );
}
