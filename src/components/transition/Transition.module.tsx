import style from "./Transition.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Transition({ pageTitle, pageNumber }: { pageTitle: string; pageNumber: string }) {
  const id = "#" + pageTitle.toLowerCase().split(" ").join("");
  const location = useLocation();
  const ref: any = useRef();

  useEffect(() => {
    if (id && location && location.hash === id.replace("#", "#before-")) {
      const timeoutId = setTimeout(() => {
        if (ref.current) { // Check if the link element exists
          (ref.current as any).click(); // Simulate click on the anchor element
        }
      }, 1000);

      return () => clearTimeout(timeoutId); // Clear timeout on cleanup
    }
  }, [id, location]);

  return (
    <a href={id} className={style.link} ref={ref}>
      <section id="before-whoweare" className={`${style.transitionContainer} transitionContainer`}>
        <span className={`${style.pageNumber} area600`}>{pageNumber}</span>
        <span className={`${style.pageTitle} nimbus900`}> {pageTitle}</span>
      </section>
    </a>
  );
}
