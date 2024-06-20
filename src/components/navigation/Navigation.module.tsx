import style from "./Navigation.module.scss";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { scrollToElementWithId } from "../../helpers/Helpers.tsx";
import { MouseEvent } from "react";

const navItems = [
  { id: "#intro", title: "INTRO" },
  { id: "#whoweare", title: "WHO WE ARE" },
  { id: "#whatwedo", title: "WHAT WE DO" },
  { id: "#ourtools", title: "OUR TOOLS" },
  { id: "#contact", title: "CONTACT" },
];

function NavItem({ id, title, pos, anim, onlyActive, location }: any) {
  const isActive = location.hash ? location.hash === id : navItems[0].id;
  const scrollDuration =
    Math.abs(
      navItems.findIndex((item) => item.id === id) -
        navItems.findIndex((item) => item.id === (window.location.hash ?? "#intro")),
    ) * 1000;

  return (
    <motion.a
      href={id}
      onClick={(e: MouseEvent) => scrollToElementWithId(e, id, scrollDuration)}
      className={style.navItem}
      {...(anim ? anim.navItem(onlyActive, isActive, pos) : {})}
    >
      <motion.span className={style.navLink}>
        {title}
        <motion.span className={style.navLinkLine} {...(anim ? anim.navLinkLine(isActive) : {})}></motion.span>
      </motion.span>
      <motion.span className={style.navLinkPage} {...(anim ? anim.navLinkPage : {})}>
        {"0" + pos}
      </motion.span>
    </motion.a>
  );
}

export default function Navigation({ onlyActive, anim }: { onlyActive: boolean; anim?: any }) {
  const location = useLocation();
  if (!location.hash) location.hash = navItems[0].id;

  return (
    <nav className={style.navigationContainer}>
      {/*{(onlyActive ? navItems.filter((navItems) => location.hash === navItems.id) : navItems).map((item, i) => (
        <NavItem id={item.id} title={item.title} pos={i + 1} key={i + 1} />
      ))}*/}
      {navItems.map((item, i) => (
        <NavItem
          id={item.id}
          title={item.title}
          pos={i + 1}
          key={"nav" + i + 1}
          anim={anim}
          onlyActive={onlyActive}
          location={location}
        />
      ))}
    </nav>
  );
}
