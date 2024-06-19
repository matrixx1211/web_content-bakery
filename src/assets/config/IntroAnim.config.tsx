/* Momentálně by animace měla probíhat v tomto pořadí
 * 1. hlavička
 * 2. text
 * 3. obrázky, navigace a číslo stránky
 * 4. kruh
 * */

const params = new URLSearchParams(window.location.search);
const paramDelay = parseFloat(params.get("delay") ?? "0");
const paramDuration = parseFloat(params.get("duration") ?? "1");
console.log(paramDelay);
console.log(paramDuration);

const textDuration = 0.85 * paramDuration;
const textDelay = 0.2 + paramDelay;

const imagesDuration = 0.3 * paramDuration;
const imagesDelay = 0.8 + paramDelay;

const headerDuration = 0.75 * paramDuration;
const headerDelay = 0.2 + paramDelay;

const navigationDuration = 0.5 * paramDuration;
const navigationDelay = 0.8 + paramDelay;

const pageNumberDuration = 0.5 * paramDuration;
const pageNumberDelay = 0.8 + paramDelay;

const circleDuration = 0.5 * paramDuration;
const circleDelay = 1 + paramDelay;

export const IntroAnimConfig = {
  header: {
    headerContainer: {
      animate: { opacity: [0, 1] },
      transition: { type: "spring", duration: headerDuration, delay: headerDelay },
    },
  },
  navigation: {
    navItem: (onlyActive: boolean, isActive: boolean, pos: number) => {
      return {
        animate: { x: [180, 0], opacity: onlyActive && !isActive ? 0 : 1 },
        whileHover: { opacity: 1 },
        transition: { type: "spring", duration: navigationDuration, delay: navigationDelay + (pos * 0.1) },
      };
    },
    navLinkLine: (isActive: boolean) => {
      return {
        style: { opacity: isActive ? 1 : 0 },
        animate: { width: ["0%", "100%"] },
        transition: { type: "spring", duration: navigationDuration, delay: navigationDelay + 0.8 },
      };
    },
    navLinkPage: {},
  },
  pageNumber: {
    pageIndicator: {
      animate: { x: [-60, 0] },
      transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
    },
    pageNumber: {
      animate: { x: [-60, 0], scale: [0.2, 1] },
      transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
    },
  },
  introContent: {
    lines: {
      introText: (isFocused: any) => {
        return {
          animate: {
            zIndex: isFocused ? 0 : 10,
          },
          transition: { type: "string", duration: textDuration },
        };
      },
      line: (index: any) => {
        return {
          variants: {
            initial: {
              y: [100, 0],
              transition: {
                type: "spring",
                duration: textDuration,
                delay: textDelay + index * 0.1,
              },
            },
            default: {
              color: "#ffffffff",
              textShadow: "0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 0 white",
              transition: {
                type: "spring",
                duration: textDuration,
              },
            },
            focus: {
              color: "#000000ff",
              textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white",
              overflow: "visible",
              transition: {
                type: "spring",
                duration: textDuration,
              },
            },
          },
        };
      },
    },
    focusableImage: {
      image: ({ x, y }: any) => {
        const delay = Math.random() * (0.5 - 0.1) + 0.1;
        console.log(delay);

        return {
          variants: {
            initial: {
              x: [x],
              y: [y],
              opacity: [0, 0.5],
              transition: { duration: imagesDuration, delay: imagesDelay + delay },
            },
            default: {
              x,
              y,
              opacity: 0.5,
              scale: 1,
              filter: "blur(2px)",
              transition: { type: "string", duration: imagesDuration },
            },
            focus: {
              x,
              y,
              opacity: 1,
              scale: 1.2,
              filter: "blur(0)",
              transition: { type: "string", duration: imagesDuration },
            },
          },
        };
      },
    },
  },
  circle: {
    circleContainer: {
      animate: { y: [15, 0, -15] },
      whileHover: { y: [null] },
      transition: {
        type: "spring",
        repeat: Infinity,
        repeatType: "mirror",
        stiffness: 200,
        damping: 50,
        mass: 0.75,
        delay: circleDelay,
      },
    },
    circle1: (pos: any) => {
      return {
        animate: { x: [-10, 0], y: [-10, 0], opacity: [0,1]},
        transition: { type: "string", duration: circleDuration, delay: circleDelay },
        style: { x: pos.x1, y: pos.y1 },
      };
    },
    circle2: (pos: any) => {
      return {
        animate: { x: [10, 0], y: [10, 0], opacity: [0,1]},
        transition: { type: "string", duration: circleDuration, delay: circleDelay },
        style: { x: pos.x2, y: pos.y2 },
      };
    },
    iconContainer: (pos: any) => {
      return {
        transition: { type: "string", duration: circleDuration, delay: circleDelay },
        style: { x: pos.x3, y: pos.y3 },
      };
    },
    icon: {
      variants: {
        hidden: {
          y: -20,
          scale: 0.5,
        },
        visible: {
          y: 0,
          scale: 1.5,
        },
      },
      initial: "hidden",
      animate: "visible",
      transition: { type: "string", duration: circleDuration, delay: circleDelay },
    },
  },
};
