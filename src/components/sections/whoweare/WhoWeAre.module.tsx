import style from "./WhoWeAre.module.css";
import Header from "../../header/Header.module.tsx";

export default function WhoWeAre() {
  return (
    <section id="whoweare" className="contentContainer">
      <Header onlyActive={true}/>
    </section>
  );
}
