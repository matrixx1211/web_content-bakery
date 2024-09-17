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
  if (element) {
    animateScroll.scrollTo(element.offsetTop, {
      duration: duration,
      smooth: true,
    });

    window.location.hash = idWithoutHash;
  }
}
