import style from "./Navigation.module.css";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const navItems = [
  { id: "#intro", title: "INTRO" },
  { id: "#whoweare", title: "WHO WE ARE" },
  { id: "#whatwedo", title: "WHAT WE DO" },
  { id: "#ourtools", title: "OUR TOOLS" },
  { id: "#contact", title: "CONTACT" },
];

export default function Navigation({ onlyActive }: { onlyActive: boolean }) {
  const location = useLocation();
  if (!location.hash) location.hash = navItems[0].id;

  function NavItem({ id, title, pos }: any) {
    const isActive = location.hash === id;

    return (
      <motion.div
        animate={{ x: [200, 0], y: [-100, 100, 0], rotate: [20, -20, 0] }}
        whileTap={{ x: [10, 0] }}
        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        className={style.navItem}
      >
        <motion.a href={id} className={`${style.navLink} ${isActive ? style.navItemActive : ""}`}>
          {title}
        </motion.a>
        <span className={style.navLinkPage}>{"0" + pos}</span>
      </motion.div>
    );
  }

  return (
    <nav className={`${style.navigationContainer} area600`}>
      {(onlyActive ? navItems.filter((navItems) => location.hash === navItems.id) : navItems).map((item, i) => (
        <NavItem id={item.id} title={item.title} pos={i + 1} key={i + 1} />
      ))}
    </nav>
  );
}
