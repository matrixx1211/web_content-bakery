import style from "./Intro.module.scss";
import Header from "../../header/Header.module.tsx";
import Circle from "../../circle/Circle.module.tsx";
import Navigation from "../../navigation/Navigation.module.tsx";
import IntroContent from "./components/IntroContent.tsx";
import PageNumber from "./components/PageNumber.tsx";
import { IntroAnimConfig } from "../../../assets/config/IntroAnim.config.tsx";

export default function Intro() {
  return (
    <section id="intro" className={style.contentContainer + " contentContainer"}>
      <Header onlyActive={false} anim={IntroAnimConfig.header} />
      <Navigation onlyActive={false} anim={IntroAnimConfig.navigation} />
      <PageNumber anim={IntroAnimConfig.pageNumber} />
      <IntroContent anim={IntroAnimConfig.introContent} />
      <Circle id="before-whoweare" anim={IntroAnimConfig.circle} />
    </section>
  );
}
