import style from "./Navigation.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "#intro", title: "INTRO" },
  { id: "#whoweare", title: "WHO WE ARE" },
  { id: "#whatwedo", title: "WHAT WE DO" },
  { id: "#ourtools", title: "OUR TOOLS" },
  { id: "#contact", title: "CONTACT" },
];

function NavItem({ id, title, pos, isActive, onClick }: any) {
  return (
    <motion.div
      animate={{ x: [200, 0], y: [-100, 100, 0], rotate: [20, -20, 0] }}
      whileTap={{x:[10, 0]}}
      transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      className={style.navItem}
      onClick={() => onClick(id)}
    >
      <motion.a href={id} className={`${style.navLink} ${isActive ? style.navItemActive : ""}`}>
        {title}
      </motion.a>
      <span className={style.navLinkPage}>{"0" + pos}</span>
    </motion.div>
  );
}

export default function Navigation() {
  const [active, setActive] = useState("#intro");

  return (
    <nav className={`${style.navigation} area600`}>
      {navItems.map((item, index) => (
        <NavItem
          id={item.id}
          title={item.title}
          pos={index + 1}
          key={index + 1}
          isActive={active === item.id}
          onClick={(id: string) => setActive(id)}
        />
      ))}
    </nav>
  );
}
