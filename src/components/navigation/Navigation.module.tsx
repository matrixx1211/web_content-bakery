import style from "./Navigation.module.scss";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { scrollToElementWithId } from "../helpers/Helpers.tsx";
import { MouseEvent, useState } from "react";

const navItems = [
  { id: "#intro", title: "INTRO", pos: 1 },
  { id: "#whoweare", title: "WHO WE ARE", pos: 2 },
  { id: "#whatwedo", title: "WHAT WE DO", pos: 3 },
  { id: "#ourtools", title: "OUR TOOLS", pos: 4 },
  { id: "#contact", title: "CONTACT", pos: 5 },
];

function NavigationItem({
  id,
  title,
  pos,
  anim,
  onlyActive,
  location,
  isActive,
  animState,
  onMouseEnter,
  onMouseLeave,
}: any) {
  const scrollDuration =
    Math.abs(
      navItems.findIndex((item) => item.id === id) -
        navItems.findIndex((item) => item.id === (location.hash ?? "#intro")),
    ) * 1000;

  return (
    <motion.a
      href={id}
      onClick={(e: MouseEvent) => scrollToElementWithId(e, id, scrollDuration)}
      className={style.navItem}
      animate={animState.variant}
      {...(anim ? anim.navItem(onlyActive, isActive, pos, animState.focus) : {})}
      onMouseEnter={() => onMouseEnter({ variant: "focused", focus: pos })}
      onMouseLeave={() => onMouseLeave({ variant: "default", focus: -1 })}
    >
      <motion.span className={style.navLink}>
        {title}
        <motion.span
          className={style.navLinkLine}
          animate={animState.variant}
          {...(anim ? anim.navLinkLine(isActive) : {})}
        ></motion.span>
      </motion.span>
      <motion.span className={style.navLinkPage} {...(anim ? anim.navLinkPage : {})}>
        {"0" + pos}
      </motion.span>
    </motion.a>
  );
}

export default function Navigation({
  onlyActive,
  anim,
  activePage,
}: {
  onlyActive: boolean;
  anim?: any;
  activePage: number;
}) {
  const location = useLocation();
  if (!location.hash) location.hash = navItems[0].id;
  const [animState, setAnimState] = useState({ variant: "initial", focus: -1 });

  return (
    <nav className={style.navigationContainer}>
      {navItems.map((item) => (
        <NavigationItem
          id={item.id}
          title={item.title}
          pos={item.pos}
          key={item.pos}
          anim={anim}
          onlyActive={onlyActive}
          location={location}
          isActive={activePage === item.pos}
          animState={animState}
          onMouseEnter={setAnimState}
          onMouseLeave={setAnimState}
        />
      ))}
    </nav>
  );
}
