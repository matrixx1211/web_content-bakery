import style from "./MobileNavigation.module.scss";
import { motion, useInView } from "framer-motion";
import { useLocation } from "react-router-dom";
import { scrollToElementWithId } from "../../../../helpers/Helpers.tsx";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import logo from "../../../../../assets/images/Logo.svg";
import logoDark from "../../../../../assets/images/LogoDark.svg";

const navItems = [
  { id: "#MobileIntro", title: "INTRO", pos: 1 },
  { id: "#MobileWhoWeAre", title: "WHO WE ARE", pos: 2 },
  { id: "#MobileWhatWeDo", title: "WHAT WE DO", pos: 3 },
  { id: "#MobileOurTools", title: "OUR TOOLS", pos: 4 },
  { id: "#MobileContact", title: "CONTACT", pos: 5 },
];

function MenuButton({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  color = "#000",
  transition = null,
  lineProps = null,
  ...props
}: any) {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * (width as number)) / (height as number);

  return (
    <motion.svg viewBox={`0 0 ${unitWidth} ${unitHeight}`} overflow="visible" preserveAspectRatio="none" width={width} height={height} {...props}>
      <motion.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
    </motion.svg>
  );
}

function MobileHeader({
  dark = false,
  anim,
  isOpen,
  setIsOpen,
}: {
  dark?: boolean;
  anim?: any;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {

  return (
    <motion.header
      className={style.headerContainer}
      {...(anim ? anim.headerContainer : {})}
      onClick={() => scrollToElementWithId(null, "DesktopIntro")}
    >
      <img src={dark ? logoDark : logo} className={style.logo} alt="logo" />
      <MenuButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        style={{ overflow: "visible" }}
        strokeWidth="2"
        color="#fff"
        transition={{ ease: "easeOut", duration: 0.2 }}
        width="28"
        height="16"
      />
    </motion.header>
  );
}

function NavigationItem({ id, title, pos, anim, onlyActive, location, isActive, animState, onMouseEnter, onMouseLeave, onSelect }: any) {
  const scrollDuration =
    Math.abs(navItems.findIndex((item) => item.id === id) - navItems.findIndex((item) => item.id === (location.hash ?? navItems[0].id))) * 1000;

  return (
    <motion.a
      href={id}
      onClick={(e: MouseEvent) => {onSelect(); scrollToElementWithId(e, id, scrollDuration)}}
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

export default function MobileNavigation({
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const location = useLocation();
  if (!location.hash) location.hash = navItems[0].id;
  const [animState, setAnimState] = useState({ variant: "initial", focus: -1, disabled: true });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (animState.disabled) setAnimState({ variant: "initial", focus: -1, disabled: false });
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, [animState]);

  const [isOpen, setIsOpen] = useState(false);
  const variants = {
    initial: {
      x: "100vw",
    },
    hidden: {
      display: "none",
      x: "100vw",
    },
    shown: {
      display: "block",
      x: "0vw",
    },
  };

  return (
    <>
      <MobileHeader isOpen={isOpen} setIsOpen={setIsOpen}></MobileHeader>
      <motion.div animate={isOpen ? "shown" : "hidden"} variants={variants} className={style.drawer} ref={ref}>
        {isInView ? (
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
                onSelect={() => setIsOpen(false)}
              />
            ))}
          </nav>
        ) : (
          <></>
        )}
      </motion.div>
    </>
  );
}
