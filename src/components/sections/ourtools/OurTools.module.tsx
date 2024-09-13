import style from "./OurTools.module.css";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";

export default function OurTools() {
  return (
    <section id="ourtools" className="contentContainer">
      <Header onlyActive={true} />
      <Navigation onlyActive={true} activePage={4} />
    </section>
  );
}
