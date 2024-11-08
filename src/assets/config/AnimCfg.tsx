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

//0.85 * paramDuration
const textDuration = 0.85 * paramDuration;
//0.2 + paramDelay
const textDelay = 0.2 + paramDelay;

//0.3 * paramDuration
const imagesDuration = 0.3 * paramDuration;
//0.8 + paramDelay
const imagesDelay = 0.8 + paramDelay;

//0.75 * paramDuration
const headerDuration = 0.75 * paramDuration;
//0.2 + paramDelay
const headerDelay = 0.2 + paramDelay;

//0.5 * paramDuration
const navigationDuration = 0.5 * paramDuration;
//0.8 + paramDelay
const navigationDelay = 0.8 + paramDelay;

//0.5 * paramDuration
const pageNumberDuration = 0.5 * paramDuration;
//0.8 + paramDelay
const pageNumberDelay = 0.8 + paramDelay;

//0.5 * paramDuration
const circleDuration = 0.5 * paramDuration;
//1 + paramDelay
const circleDelay = 1 + paramDelay;

//1
const transitionDuration = 1;
//0.5
const transitionDelay = 0.5;

//1
const sectionDelay = 1;

export const onboardingDuration = 3;

export const AnimCfg = {
  general: {
    onboarding: {
      div: {
        variants: {
          loading: {
            display: "flex",
            transition: { duration: onboardingDuration * 0.5 },
          },
          hide: {
            display: "none",
            opacity: [1, 0],
            transition: { duration: onboardingDuration * 0.3 },
          },
        },
      },
      image: {
        variants: {
          loading: {
            opacity: [0, 1],
            transition: { delay: onboardingDuration * 0.1, duration: onboardingDuration * 0.4 },
          },
          hide: {
            opacity: [1, 0],
            transition: { duration: onboardingDuration * 0.3 },
          },
        },
      },
    },
    transition: {
      transitionText: {
        initial: "enter",
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
      },
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
              opacity: 0,
            },
            visible: {
              y: 0,
              scale: 1.5,
              opacity: 1,
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
    inlineCircle: (applySectionDelay: boolean) => {
      return {
        circleContainer: {
          animate: { x: [15, 0, -15] },
          whileHover: { x: [null] },
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
              y: 0,
              //scale: 0.5,
              opacity: 0,
            },
            visible: {
              y: 0,
              //scale: 1.5,
              opacity: 1,
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
  },
  desktop: {
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
                  color: "#fff",
                  textShadow: "0 0 0",
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1,
                  },
                },
                afterLoad: {
                  y: [0],
                  color: "#fff",

                  textShadow: "0 0 0",
                  transition: { duration: 0 },
                },
                default: {
                  y: [0],
                  color: "#fff",
                  textShadow: "0 0 0",
                  transition: {
                    type: "spring",
                    duration: textDuration,
                  },
                },
                focus: {
                  y: [0],
                  color: "#000",
                  textShadow: "0 0 0.2rem white, 0 0 0.2rem white, 0 0 0.2rem white, 0 0 0.2rem white",
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
              variants: {
                initial: {
                  y: [55, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: {
                    duration: 0,
                  },
                },
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
              variants: {
                initial: {
                  y: [26, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
      },
    },
    whatWeDo: {
      whatWeDoContent: {
        linesWithDetail: {
          lineContainer: {
            variants: {
              initial: {
                overflow: ["hidden"],
                transition: { duration: textDuration * 0.4 },
              },
              default: {
                overflow: ["visible"],
                width: "fit-content",
                transition: { duration: 0 },
              },
              focus: {
                overflow: ["visible"],
                width: "fit-content",
                transition: { duration: 0 },
              },
            },
          },
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [70, 0],
                  color: "#fff",
                  opacity: [1],
                  textShadow: "0 0 0",
                  transition: {
                    duration: textDuration * 0.4,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                default: {
                  y: 0,
                  opacity: 1,
                  color: "#fff",
                  textShadow: "0 0 0",
                  transition: { duration: 0 },
                },
                unfocus: {
                  y: 0,
                  opacity: 0.35,
                  color: "#000",
                  transition: { type: "string", duration: textDuration * 0.3 },
                },
                focus: {
                  y: 0,
                  opacity: 1,
                  color: "#fff",
                  textShadow: "0 0 0",
                  transition: { type: "string", duration: textDuration * 0.3 },
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
                opacity: [0],
                transition: { duration: 0 },
              },
              focus: {
                opacity: [0, 1],
                backgroundColor: "rgba(0,0,0,0.3)",
                transition: { duration: textDuration * 0.5 },
              },
            },
          },
        },
      },
    },
    ourTools: {
      ourToolsContent: {
        bigLines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [55, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
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
              variants: {
                initial: {
                  y: [25, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
      },
    },
    ourTools2: {
      ourTools2Content: {
        linesWithDetail: {
          lineContainer: {
            variants: {
              initial: {
                overflow: ["hidden"],
                transition: { duration: textDuration * 0.4 },
              },
              default: {
                overflow: ["visible"],
                width: "fit-content",
                transition: { duration: 0 },
              },
              focus: {
                overflow: ["visible"],
                width: "fit-content",
                transition: { duration: 0 },
              },
            },
          },
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [70, 0],
                  color: "#000",
                  opacity: [1],
                  textShadow: "0 0 0",
                  transition: {
                    duration: textDuration * 0.4,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                default: {
                  y: 0,
                  opacity: 1,
                  color: "#000",
                  textShadow: "0 0 0",
                  transition: { duration: 0 },
                },
                unfocus: {
                  y: 0,
                  opacity: 0.35,
                  color: "#fff",
                  transition: { type: "string", duration: textDuration * 0.3 },
                },
                focus: {
                  y: 0,
                  opacity: 1,
                  color: "#000",
                  textShadow: "0 0 0",
                  transition: { type: "string", duration: textDuration * 0.3 },
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
                opacity: [0],
                transition: { duration: 0 },
              },
              focus: {
                opacity: [0, 1],
                backgroundColor: "rgba(244,244,244,0.3)",
                transition: { duration: textDuration * 0.5 },
              },
            },
          },
        },
      },
    },
    contact: {
      contactContent: {
        topLines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [80, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
        bottomLines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [80, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + (index + 5) * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
      },
    },
  },
  mobile: {
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
    },
    intro: {
      introContent: {
        lines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [48, 0],
                  color: "#fff",
                  textShadow: "0 0 0",
                  z: 1,
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                }
              },
            };
          },
        },
        focusableImage: {
          focusableImage: () => {
            const delay = Math.random() * (0.6 - 0.1) + 0.1;
            return {
              animate: {
                opacity: [0, 0.6],
              },
              transition: { duration: imagesDuration, delay: imagesDelay + delay },
            };
          },
        },
        pageNumber: {
          pageIndicator: {
            animate: { x: [60, 0] },
            transition: { type: "spring", duration: pageNumberDuration, delay: pageNumberDelay },
          },
          pageNumber: {
            animate: { x: [60, 0], scale: [0.2, 1] },
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
              variants: {
                initial: {
                  y: [44, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: {
                    duration: 0,
                  },
                },
              },
            };
          },
        },
        pageNumber: {
          pageIndicator: {
            animate: { width: ["0%", "50%"] },
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
              variants: {
                initial: {
                  y: [26, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
      },
    },
    whatWeDo: {
      whatWeDoContent: {
        linesWithDetail: {
          detailImage: {
            animate: { opacity: [0, 1] },
            transition: { duration: imagesDuration * 2.5, delay: sectionDelay * 0.3 + textDelay },
          },
          smallLines: {
            line: (index: any) => {
              return {
                variants: {
                  initial: {
                    y: [28, 0],
                    transition: {
                      type: "spring",
                      duration: textDuration,
                      delay: textDelay + index * 0.1 + sectionDelay * 0.3,
                    },
                  },
                  afterLoad: {
                    y: [0],
                    transition: { duration: 0 },
                  },
                },
              };
            },
          },
          lineImage: {
            animate: { opacity: [0, 0.75] },
            transition: { duration: imagesDuration * 2, delay: imagesDelay },
          },
          line: {
            animate: {
              y: [60, 0],
            },
            transition: {
              duration: textDuration * 0.4,
              delay: textDelay + sectionDelay * 0.3,
            },
          },
        },
      },
    },
    ourTools: {
      ourToolsContent: {
        bigLines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [44, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
        pageNumber: {
          pageIndicator: {
            animate: { width: ["0%", "50%"] },
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
              variants: {
                initial: {
                  y: [26, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
      },
    },
    ourTools2: {
      ourTools2Content: {
        linesOnSide: {
          bigLines: {
            line: (index: any) => {
              return {
                variants: {
                  initial: {
                    y: [55, 0],
                    transition: {
                      type: "spring",
                      duration: textDuration,
                      delay: textDelay + index * 0.1 + sectionDelay,
                    },
                  },
                  afterLoad: {
                    y: [0],
                    transition: { duration: 0 },
                  },
                },
              };
            },
          },
          smallLines: {
            line: (index: any) => {
              return {
                variants: {
                  initial: {
                    y: [26, 0],
                    transition: {
                      type: "spring",
                      duration: textDuration,
                      delay: textDelay + index * 0.1 + sectionDelay,
                    },
                  },
                  afterLoad: {
                    y: [0],
                    transition: { duration: 0 },
                  },
                },
              };
            },
          },
        },
      },
    },
    ourTools3: {
      ourTools3Content: {
        linesOnSide: {
          bigLines: {
            line: (index: any) => {
              return {
                variants: {
                  initial: {
                    y: [55, 0],
                    transition: {
                      type: "spring",
                      duration: textDuration,
                      delay: textDelay + index * 0.1 + sectionDelay,
                    },
                  },
                  afterLoad: {
                    y: [0],
                    transition: { duration: 0 },
                  },
                },
              };
            },
          },
          smallLines: {
            line: (index: any) => {
              return {
                variants: {
                  initial: {
                    y: [26, 0],
                    transition: {
                      type: "spring",
                      duration: textDuration,
                      delay: textDelay + index * 0.1 + sectionDelay,
                    },
                  },
                  afterLoad: {
                    y: [0],
                    transition: { duration: 0 },
                  },
                },
              };
            },
          },
        },
      },
    },
    contact: {
      contactContent: {
        topLines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [44, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + index * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
        bottomLines: {
          line: (index: any) => {
            return {
              variants: {
                initial: {
                  y: [80, 0],
                  transition: {
                    type: "spring",
                    duration: textDuration,
                    delay: textDelay + (index + 5) * 0.1 + sectionDelay,
                  },
                },
                afterLoad: {
                  y: [0],
                  transition: { duration: 0 },
                },
              },
            };
          },
        },
      },
    },
  },
};
