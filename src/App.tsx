import "./App.scss";
import { lazy } from "react";
const Cursor = lazy(() => import("./components/cursor/Cursor.module.tsx"));
const Intro = lazy(() => import("./components/sections/intro/Intro.module.tsx"));
const WhoWeAre = lazy(() => import("./components/sections/whoweare/WhoWeAre.module.tsx"));
const WhatWeDo = lazy(() => import("./components/sections/whatwedo/WhatWeDo.module.tsx"));
const OurTools = lazy(() => import("./components/sections/ourtools/OurTools.module.tsx"));
const OurTools2 = lazy(() => import("./components/sections/ourtools2/OurTools2.module.tsx"));
const Contact = lazy(() => import("./components/sections/contact/Contact.module.tsx"));
const Transition = lazy(() => import("./components/sections/transition/Transition.module.tsx"));

export default function App() {
  return (
    <>
      <Cursor />

      <Intro />
      <Transition toId="before-whoweare" pageNumber="02" pageTitle="WHO WE ARE" />
      <WhoWeAre />
      <Transition toId="before-whatwedo" pageNumber="03" pageTitle="WHAT WE DO" />
      <WhatWeDo />
      <Transition toId="before-ourtools" pageNumber="04" pageTitle="OUR TOOLS" />
      <OurTools />
      <OurTools2 />
      <Transition toId="before-contact" pageNumber="05" pageTitle="CONTACT" />
      <Contact />
    </>
  );
}
