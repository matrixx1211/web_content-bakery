import style from "./Transition.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scrollToElementWithId } from "../../helpers/Helpers.tsx";

export default function Transition({
  toId,
  pageTitle,
  pageNumber,
}: {
  toId: string;
  pageTitle: string;
  pageNumber: string;
}) {
  const id = "#" + pageTitle.toLowerCase().split(" ").join("");

  const location = useLocation();
  useEffect(() => {
    if (id && location && location.hash === id.replace("#", "#before-")) {
      const timeoutId = setTimeout(() => {
        scrollToElementWithId(null, id, 1500);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [id, location]);

  return (
    <section id={toId} className={`${style.transitionContainer} transitionContainer`}>
      <span className={style.pageNumber}>{pageNumber}</span>
      <span className={style.pageTitle}> {pageTitle}</span>
    </section>
  );
}
