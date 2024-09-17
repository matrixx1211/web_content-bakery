import style from "./Header.module.scss";
import logoWithText from "../../assets/images/LogoWithText.svg";
import logo from "../../assets/images/Logo.svg";
import logoDark from "../../assets/images/LogoDark.svg";
import { motion } from "framer-motion";
import { scrollToElementWithId } from "../helpers/Helpers.tsx";

export default function Header({
  dark = false,
  onlyActive,
  anim,
}: {
  dark?: boolean;
  onlyActive: boolean;
  anim?: any;
}) {
  return (
    <motion.header
      className={style.headerContainer}
      {...(anim ? anim.headerContainer : {})}
      onClick={() => scrollToElementWithId(null, "DesktopIntro")}
    >
      <img src={onlyActive ? (dark ? logoDark : logo) : logoWithText} className={style.logo} alt="logo" />
      <span style={{ opacity: onlyActive ? 0 : 1 }} className={style.languageSelector}>
        CZ
      </span>
    </motion.header>
  );
}
