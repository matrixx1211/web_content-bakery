import "./App.css";
import Navigation from "./components/navigation/Navigation.module.tsx";
import Intro from "./components/sections/intro/Intro.module.tsx";
import WhoWeAre from "./components/sections/whoweare/WhoWeAre.module.tsx";
import WhatWeDo from "./components/sections/whatwedo/WhatWeDo.module.tsx";
import OurTools from "./components/sections/ourtools/OutTools.module.tsx";
import Contact from "./components/sections/contact/Contact.module.tsx";
import Transition from "./components/transition/Transition.module.tsx";
import Cursor from "./components/cursor/Cursor.module.tsx";
import { useEffect, useState } from "react";
import logo from "./assets/images/Logo.svg";
import { motion } from "framer-motion";

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
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.img
            src={logo}
            style={{ width: 600, height: 600, margin: "auto" /*position: "absolute", display: "block"*/ }}
            animate={{ rotate: [0, 360], scale: [1, 0.5] }}
            transition={{ type: "spring", stiffness: 75, duration: 0.9 }}
          />
        </div>
      ) : (
        <>
          <Navigation />
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
