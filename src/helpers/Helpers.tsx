import { MouseEvent } from "react";
import { animateScroll } from "react-scroll";

/**
 * @description Lze aplikovat na <a> elementy
 * @param e event z kliknutí
 * @param id id další sekce
 * @param duration doba jak dlouho se bude posouvat [ms], výchozí 1000ms
 **/
export function scrollToElementWithId(e: MouseEvent | null, id: string, duration: number = 1000) {
  const idWithoutHash = id.includes("#") ? id.replace("#", "") : id;
  const element = document.getElementById(idWithoutHash);
  if (element) {
    if (e) e.preventDefault();
    animateScroll.scrollTo(element.offsetTop, {
      duration: duration,
      smooth: true,
    });
    window.location.hash = idWithoutHash;
  }
}
