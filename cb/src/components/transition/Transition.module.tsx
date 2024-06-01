import style from "./Transition.module.css";

export default function Transition({ pageTitle, pageNumber }: { pageTitle: string; pageNumber: string }) {
  return (
    <section id="before-whoweare" className={`${style.transitionContainer} transitionContainer`}>
      <span className={`${style.pageNumber} area600`}>{pageNumber}</span>
      <span className={`${style.pageTitle} nimbus900`}> {pageTitle}</span>
    </section>
  );
}
