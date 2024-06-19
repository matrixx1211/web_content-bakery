import style from "./Contact.module.scss";
import Header from "../../header/Header.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";

export default function Contact() {
  return (
    <section id="contact" className="contentContainer">
      <Header onlyActive={true} />
      <Navigation onlyActive={true} />
    </section>
  );
}
