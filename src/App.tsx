import "./App.scss";
import { lazy } from "react";
const Intro = lazy(() => import("./components/sections/intro/Intro.module.tsx"));
const WhoWeAre = lazy(() => import("./components/sections/whoweare/WhoWeAre.module.tsx"));
const WhatWeDo = lazy(() => import("./components/sections/whatwedo/WhatWeDo.module.tsx"));
const OurTools = lazy(() => import("./components/sections/ourtools/OutTools.module.tsx"));
const Contact = lazy(() => import("./components/sections/contact/Contact.module.tsx"));
const Transition = lazy(() => import("./components/transition/Transition.module.tsx"));
import Cursor from "./components/cursor/Cursor.module.tsx";

function App() {
  return (
    <>
      <Cursor />

      <Intro />
      <Transition pageNumber="02" pageTitle="WHO WE ARE" />
      <WhoWeAre />
      <Transition pageNumber="03" pageTitle="WHAT WE DO" />
      <WhatWeDo />
      <Transition pageNumber="04" pageTitle="OUT TOOLS" />
      <OurTools />
      <Transition pageNumber="05" pageTitle="CONTACT" />
      <Contact />
    </>
  );
}

export default App;
