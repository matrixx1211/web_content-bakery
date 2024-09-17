import style from "./Navigation.module.scss";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { scrollToElementWithId } from "../helpers/Helpers.tsx";
import { MouseEvent, useEffect, useState } from "react";

const navItems = [
  { id: "#DesktopIntro", title: "INTRO", pos: 1 },
  { id: "#DesktopWhoWeAre", title: "WHO WE ARE", pos: 2 },
  { id: "#DesktopWhatWeDo", title: "WHAT WE DO", pos: 3 },
  { id: "#DesktopOurTools", title: "OUR TOOLS", pos: 4 },
  { id: "#DesktopContact", title: "CONTACT", pos: 5 },
];

function NavigationItem({ id, title, pos, anim, onlyActive, location, isActive, animState, onMouseEnter, onMouseLeave }: any) {
  const scrollDuration =
    Math.abs(navItems.findIndex((item) => item.id === id) - navItems.findIndex((item) => item.id === (location.hash ?? navItems[0].id))) * 1000;

  return (
    <motion.a
      href={id}
      onClick={(e: MouseEvent) => scrollToElementWithId(e, id, scrollDuration)}
      className={style.navItem}
      animate={animState.variant}
      {...(anim ? anim.navItem(onlyActive, isActive, pos, animState.focus) : {})}
      onMouseEnter={() => {
        if (!animState.disabled) onMouseEnter({ variant: "focused", focus: pos, disabled: false });
      }}
      onMouseLeave={() => {
        if (!animState.disabled) onMouseLeave({ variant: "default", focus: -1, disabled: false });
      }}
    >
      <motion.span className={style.navLink}>
        {title}
        <motion.span className={style.navLinkLine} animate={animState.variant} {...(anim ? anim.navLinkLine(isActive) : {})}></motion.span>
      </motion.span>
      <motion.span className={style.navLinkPage} {...(anim ? anim.navLinkPage : {})}>
        {"0" + pos}
      </motion.span>
    </motion.a>
  );
}

export default function Navigation({
  dark = false,
  onlyActive,
  anim,
  activePage,
}: {
  dark?: boolean;
  onlyActive: boolean;
  anim?: any;
  activePage: number;
}) {
  const location = useLocation();
  if (!location.hash) location.hash = navItems[0].id;
  const [animState, setAnimState] = useState({ variant: "initial", focus: -1, disabled: true });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (animState.disabled) setAnimState({ variant: "initial", focus: -1, disabled: false });
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, [animState]);

  return (
    <nav className={dark ? style.navigationContainerDark : style.navigationContainer}>
      {navItems.map((item) => (
        <NavigationItem
          dark={dark}
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
