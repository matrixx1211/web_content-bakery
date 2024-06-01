import "./global.scss";
import "./sections.scss";
import "./navigation.scss";
import "./header.scss";
import anime from "animejs/lib/anime.es.js";

/* Kurzor */
// Pohyb kurzoru
const cursorTranslation = 5;
const cursorAnimDuration = 100;
window.addEventListener("pointerover", () => {
  let cursor = document.getElementById("cursor");
  if (!cursor) return;
  cursor.style.opacity = "1.0";
});
window.addEventListener("mousemove", (e: MouseEvent) => {
  let cursor = document.getElementById("cursor");
  if (!cursor) return;

  function updateCursor(e: MouseEvent) {
    cursor!.style.setProperty("left", `${e.pageX}px`);
    cursor!.style.setProperty("top", `${e.pageY}px`);
  }
  requestAnimationFrame(updateCursor.bind(null, e));
});

// Animace kurzoru
window.addEventListener("mousedown", () => {
  anime({ targets: "#top", easing: "linear", translateY: [cursorTranslation], duration: cursorAnimDuration });
  anime({ targets: "#right", easing: "linear", translateX: [-cursorTranslation], duration: cursorAnimDuration });
  anime({ targets: "#bottom", easing: "linear", translateY: [-cursorTranslation], duration: cursorAnimDuration });
  anime({ targets: "#left", easing: "linear", translateX: [cursorTranslation], duration: cursorAnimDuration });
});

window.addEventListener("mouseup", () => {
  anime({ targets: "#top", easing: "linear", translateY: [0], duration: cursorAnimDuration });
  anime({ targets: "#right", easing: "linear", translateX: [-0], duration: cursorAnimDuration });
  anime({ targets: "#bottom", easing: "linear", translateY: [-0], duration: cursorAnimDuration });
  anime({ targets: "#left", easing: "linear", translateX: [0], duration: cursorAnimDuration });
});

// Animace čísla stránky
const pageNumber = anime.timeline();
pageNumber.add({ targets: ".page-indicator", translateX: [-40, 0], easing: "easeOutExpo", duration: 800 }, 0);
pageNumber.add({ targets: ".page-number", translateX: [-60, 0], easing: "easeOutExpo", duration: 200 }, 300);

// Animace navigace
anime({
  targets: ".nav-item",
  translateX: ["100%", "80%", "60%", "40%", "20%", "0%"],
  translateY: [-30, -20, -10,  0],
  easing: "linear",
  duration: 1000,
});
//anime({ targets: ".nav-item", translateY: [10, 0, 10, 0, 10, 0, 10, 0], easing: "easeInBounce", duration: 1000 });

/* Animace sekcí */
// INTRO
anime({ targets: ".intro-text-line", translateY: [100, 0], easing: "easeOutExpo", duration: 1400 });