/* Momentálně by animace měla probíhat v tomto pořadí
 * 1. hlavička
 * 2. text
 * 3. obrázky, navigace a číslo stránky
 * 4. kruh
 * */

import { useState } from "react";

const params = new URLSearchParams(window.location.search);
const paramDelay = parseFloat(params.get("delay") ?? "0");
const paramDuration = parseFloat(params.get("duration") ?? "1");

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

const transitionDuration = 1;
const transitionDelay = 0.5;

const sectionDelay = 1;

export const AnimCfg = {
  general: {
    header: (applySectionDelay: boolean) => {
      return {
        headerContainer: {
          animate: { opacity: [0, 1] },
          transition: {
            type: "spring",
            duration: headerDuration,
            delay: headerDelay + (applySectionDelay ? sectionDelay : 0),
          },
        },
      };
    },
    navigation: (applySectionDelay: boolean) => {
      return {
        navItem: (onlyActive: boolean, isActive: boolean, pos: number, focus: number) => {
          const [initialOpacity, setInitialOpacity] = useState(true);
          setTimeout(() => setInitialOpacity(false), 1000);
          return {
            variants: {
              initial: {
                x: [180, 0],
                opacity: initialOpacity ? 1 : onlyActive && !isActive ? 0 : 1,
              },
              default: {
                x: [0],
                opacity: onlyActive && !isActive ? 0 : 1,
                transition: { duration: 0.5, delay: 0.5 },
              },
              focused: {
                x: [0],
                opacity: pos === focus ? 1 : onlyActive && !isActive ? 0 : 1,
                transition: { duration: 0, delay: 0 },
              },
            },
            transition: {
              type: "spring",
              duration: navigationDuration,
              delay: navigationDelay + pos * 0.1 + (applySectionDelay ? sectionDelay : 0),
            },
          };
        },
        navLinkLine: (isActive: boolean) => {
          return {
            variants: {
              initial: {
                width: ["0%", "100%"],
                opacity: isActive ? [1] : [0],
              },
              default: {
                //width: ["100%"],
                opacity: isActive ? [1] : [0],
              },
              focused: {
                //width: ["100%"]
              },
            },
            transition: {
              type: "spring",
              duration: navigationDuration,
              delay: navigationDelay + 0.8 + (applySectionDelay ? sectionDelay : 0),
            },
            //animate: { width: ["0%", "100%"], opacity: isActive ? [1] : [0] },
          };
        },
        navLinkPage: {},
      };
    },
    circle: (applySectionDelay: boolean) => {
      return {
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
            delay: circleDelay + (applySectionDelay ? sectionDelay : 0),
          },
        },
        circle1: (pos: any) => {
          return {
            animate: { x: [-10, 0], y: [-10, 0], opacity: [0, 1] },
            transition: {
              type: "string",
              duration: circleDuration,
              delay: circleDelay + (applySectionDelay ? sectionDelay : 0),
            },
            style: { x: pos.x1, y: pos.y1 },
          };
        },
        circle2: (pos: any) => {
          return {
            animate: { x: [10, 0], y: [10, 0], opacity: [0, 1] },
            transition: {
              type: "string",
              duration: circleDuration,
              delay: circleDelay + (applySectionDelay ? sectionDelay : 0),
            },
            style: { x: pos.x2, y: pos.y2 },
          };
        },
        iconContainer: (pos: any) => {
          return {
            transition: {
              type: "string",
              duration: circleDuration,
              delay: circleDelay + (applySectionDelay ? sectionDelay : 0),
            },
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
          transition: {
            type: "string",
            duration: circleDuration,
            delay: circleDelay + (applySectionDelay ? sectionDelay : 0),
          },
        },
      };
    },

    transition: {
      transitionText: (animState: string) => {
        return {
          animate: animState,
          variants: {
            enter: {
              y: ["-1000%", 0],
              opacity: [0, 0.9, 1],
              transition: { type: "string", duration: transitionDuration, delay: transitionDelay },
            },
            leave: {
              y: [0, "1000%"],
              opacity: [1, 0.9, 0],
              transition: { type: "string", duration: transitionDuration * 0.66, delay: transitionDelay },
            },
          },
        };
      },
    },
  },
  intro: {
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
        focusableImage: () => {
          const delay = Math.random() * (0.6 - 0.1) + 0.1;

          return {
            variants: {
              initial: {
                opacity: [0, 0.5],
                filter: "blur(2px)",
                transition: { duration: imagesDuration, delay: imagesDelay + delay },
              },
              default: {
                opacity: 0.5,
                scale: 1,
                filter: "blur(2px)",
                transition: { type: "string", duration: imagesDuration },
              },
              focus: {
                opacity: 1,
                scale: 1.1,
                filter: "blur(0)",
                transition: { type: "string", duration: imagesDuration },
              },
            },
          };
        },
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
    },
  },
  whoWeAre: {
    whoWeAreContent: {
      bigLines: {
        line: (index: any) => {
          return {
            animate: { y: [55, 0] },
            transition: {
              type: "spring",
              duration: textDuration,
              delay: textDelay + index * 0.1 + sectionDelay,
            },
          };
        },
      },
      pageNumber: {
        pageIndicator: {
          animate: { width: ["0%", "100%"] },
          transition: { type: "spring", duration: pageNumberDuration + 0.5, delay: pageNumberDelay + sectionDelay },
        },
        pageNumber: {
          animate: { scale: [0, 1] },
          transition: { type: "spring", duration: pageNumberDuration + 0.5, delay: pageNumberDelay + sectionDelay },
        },
      },
      smallLines: {
        line: (index: any) => {
          return {
            animate: { y: [25, 0] },
            transition: {
              type: "spring",
              duration: textDuration,
              delay: textDelay + index * 0.1 + sectionDelay,
            },
          };
        },
      },
    },
  },
  whatWeDo: {
    whatWeDoContent: {
      linesWithDetail: {
        line: (index: any) => {
          return {
            variants: {
              initial: {
                y: [70, 0],
                transition: {
                  type: "spring",
                  duration: textDuration,
                  delay: textDelay + index * 0.1 + sectionDelay,
                },
              },
              default: {
                opacity: 1,
                color: "#ffffffff",
                textShadow: "0 0 0 0",
                //transition: { type: "string", duration: textDuration / 3 },
              },
              unfocus: {
                opacity: 0.5,
                color: "#000000ff",
                textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white",
                transition: { type: "string", duration: textDuration / 3 },
              },
              focus: {
                opacity: 1,
                color: "#ffffffff",
                textShadow: "0 0 0 white, 0 0 0 white, 0 0 0 white, 0 0 0 white",
                transition: { type: "string", duration: textDuration / 3 },
              },
            },
          };
        },
        detail: {
          variants: {
            initial: {
              opacity: 0,
              transition: {
                type: "spring",
                duration: textDuration,
                delay: textDelay * 0.1 + sectionDelay,
              },
            },
            default: {
              opacity: 0,
              backgroundColor: "transparent",
              transition: { type: "string", duration: textDuration / 3 },
            },
            focus: {
              opacity: 1,
              backgroundColor: "rgba(0,0,0,0.3)",
              transition: { type: "string", duration: textDuration / 3 },
            },
          },
        },
      },
      /*pageNumber: {
        pageIndicator: {
          //animate: { x: [-60, 0] },
          //transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
        },
        pageNumber: {
          //animate: { x: [-60, 0], scale: [0.2, 1] },
          //transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
        },
      },*/
    },
  },
  ourTools: {
    ourToolsContent: {
      bigLines: {
        line: (index: any) => {
          return {
            animate: { y: [55, 0] },
            transition: {
              type: "spring",
              duration: textDuration,
              delay: textDelay + index * 0.1 + sectionDelay,
            },
          };
        },
      },
      pageNumber: {
        pageIndicator: {
          animate: { width: ["0%", "100%"] },
          transition: { type: "spring", duration: pageNumberDuration + 0.5, delay: pageNumberDelay + sectionDelay },
        },
        pageNumber: {
          animate: { scale: [0, 1] },
          transition: { type: "spring", duration: pageNumberDuration + 0.5, delay: pageNumberDelay + sectionDelay },
        },
      },
      smallLines: {
        line: (index: any) => {
          return {
            animate: { y: [25, 0] },
            transition: {
              type: "spring",
              duration: textDuration,
              delay: textDelay + index * 0.1 + sectionDelay,
            },
          };
        },
      },
    },
  },
  ourTools2: {
    ourTools2Content: {
      linesWithDetail: {
        line: (index: any) => {
          return {
            variants: {
              initial: {
                y: [70, 0],
                transition: {
                  type: "spring",
                  duration: textDuration,
                  delay: textDelay + index * 0.1 + sectionDelay,
                },
              },
              default: {
                opacity: 1,
                color: "#000000ff",
                textShadow: "0 0 0 0",
                //transition: { type: "string", duration: textDuration / 3 },
              },
              unfocus: {
                opacity: 0.5,
                color: "#f4f4f4ff",
                textShadow: "0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black",
                transition: { type: "string", duration: textDuration / 3 },
              },
              focus: {
                opacity: 1,
                color: "#000000ff",
                textShadow: "0 0 0 black, 0 0 0 black, 0 0 0 black, 0 0 0 black",
                transition: { type: "string", duration: textDuration / 3 },
              },
            },
          };
        },
        detail: {
          variants: {
            initial: {
              opacity: 0,
              transition: {
                type: "spring",
                duration: textDuration,
                delay: textDelay * 0.1 + sectionDelay,
              },
            },
            default: {
              opacity: 0,
              backgroundColor: "transparent",
              transition: { type: "string", duration: textDuration / 3 },
            },
            focus: {
              opacity: 1,
              backgroundColor: "rgba(244,244,244,0.2)",
              transition: { type: "string", duration: textDuration / 3 },
            },
          },
        },
      },
      /*pageNumber: {
        pageIndicator: {
          //animate: { x: [-60, 0] },
          //transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
        },
        pageNumber: {
          //animate: { x: [-60, 0], scale: [0.2, 1] },
          //transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
        },
      },*/
    },
  },
  contact: {
    contactContent: {
      topLines: {
        line: (index: any) => {
          return {
            animate: { y: [65, 0] },
            transition: {
              type: "spring",
              duration: textDuration,
              delay: textDelay + index * 0.1 + sectionDelay,
            },
          };
        },
      },
      bottomLines: {
        line: (index: any) => {
          return {
            animate: { y: [65, 0] },
            transition: {
              type: "spring",
              duration: textDuration,
              delay: textDelay + (index + 5) * 0.1 + sectionDelay,
            },
          };
        },
      },
    },
  },
};
