import style from "./Navigation.module.scss";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { scrollToElementWithId } from "../helpers/Helpers.tsx";
import { MouseEvent } from "react";

const navItems = [
  { id: "#intro", title: "INTRO", pos: 1 },
  { id: "#whoweare", title: "WHO WE ARE", pos: 2 },
  { id: "#whatwedo", title: "WHAT WE DO", pos: 3 },
  { id: "#ourtools", title: "OUR TOOLS", pos: 4 },
  { id: "#contact", title: "CONTACT", pos: 5 },
];

function NavigationItem({ id, title, pos, anim, onlyActive, location }: any) {
  const isActive = location.hash === id;
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
  //if (!location.hash) window.location.hash =  navItems[0].id.replace("#", "");

  return (
    <nav className={style.navigationContainer}>
      {(onlyActive ? navItems.filter((navItems) => location.hash === navItems.id) : navItems).map((item) => (
        <NavigationItem
          id={item.id}
          title={item.title}
          pos={item.pos}
          key={item.pos}
          anim={anim}
          onlyActive={onlyActive}
          location={location}
        />
      ))}
      {/* {navItems.map((item, i) => (
        <NavItem
          id={item.id}
          title={item.title}
          pos={i + 1}
          key={"nav" + i + 1}
          anim={anim}
          onlyActive={onlyActive}
          location={location}
        />
      ))}*/}
    </nav>
  );
}
