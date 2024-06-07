import "./App.scss";
import Intro from "./components/sections/intro/Intro.module.tsx";
import WhoWeAre from "./components/sections/whoweare/WhoWeAre.module.tsx";
import WhatWeDo from "./components/sections/whatwedo/WhatWeDo.module.tsx";
import OurTools from "./components/sections/ourtools/OutTools.module.tsx";
import Contact from "./components/sections/contact/Contact.module.tsx";
import Transition from "./components/transition/Transition.module.tsx";
import Cursor from "./components/cursor/Cursor.module.tsx";
import { useEffect, useState } from "react";
import Boarding from "./components/boarding/Boarding.module.tsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Boarding />
      ) : (
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
      )}
    </>
  );
}

export default App;
