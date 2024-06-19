import style from "./WhatWeDo.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";

export default function WhatWeDo() {
  return (
    <section id="whatwedo" className="contentContainer">
      <Header onlyActive={true} />
      <Navigation onlyActive={true} />
    </section>
  );
}
