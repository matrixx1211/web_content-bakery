import { MouseEvent } from "react";
import { animateScroll } from "react-scroll";

/**
 * @description Lze aplikovat na <a> elementy
 * @param e event z kliknutí
 * @param toId id další sekce
 * @param duration doba jak dlouho se bude posouvat [ms], výchozí 1000ms
 **/
export function scrollToElementWithId(e: MouseEvent | null, toId: string, duration: number = 1000) {
  const idWithoutHash = toId.includes("#") ? toId.replace("#", "") : toId;
  const element = document.getElementById(idWithoutHash)!;

  if (e) e.preventDefault();
  animateScroll.scrollTo(element.offsetTop, {
    duration: duration,
    smooth: true,
  });

  window.location.hash = idWithoutHash;
}

/* Možná implementace
/!**
 * @description Lze aplikovat na <a> elementy
 * @param e event z kliknutí
 * @param toId id další sekce
 * @param additionalDuration doba [ms], která se ještě přičte k vypočítané hodnotě trvání
 **!/
export function scrollToElementWithId(e: MouseEvent | null, toId: string, additionalDuration: number = 0) {
  const idWithoutHash = toId.includes("#") ? toId.replace("#", "") : toId;
  const from = document.getElementById(window.location.hash.replace("#", ""))!;
  const to = document.getElementById(idWithoutHash)!;

  console.log(`from: ${from.id} - ${from.offsetTop} to: ${to.id} - ${to.offsetTop}`);
  const duration = Math.abs(from.offsetTop - to.offsetTop) + additionalDuration;
  if (e) e.preventDefault();
  animateScroll.scrollTo(to.offsetTop, {
    duration: duration,
    smooth: true,
  });
  window.location.hash = idWithoutHash;
}
*/
