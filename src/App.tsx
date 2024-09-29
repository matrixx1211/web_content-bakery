import "./App.scss";
import { lazy, useEffect, useState } from "react";
import { onboardingDuration } from "./assets/config/AnimCfg.tsx";
import { scrollToElementWithId } from "./components/helpers/Helpers.tsx";
import { useLocation } from "react-router-dom";
const Onboarding = lazy(() => import("./components/sections/Onboarding/Onboarding.module.tsx"));
const Cursor = lazy(() => import("./components/cursor/Cursor.module.tsx"));
const DesktopIntro = lazy(() => import("./components/sections/desktop/DesktopIntro/DesktopIntro.module.tsx"));
const DesktopWhoWeAre = lazy(() => import("./components/sections/desktop/DesktopWhoWeAre/DesktopWhoWeAre.module.tsx"));
const DesktopWhatWeDo = lazy(() => import("./components/sections/desktop/DesktopWhatWeDo/DesktopWhatWeDo.module.tsx"));
const DesktopOurTools = lazy(() => import("./components/sections/desktop/DesktopOurTools/DesktopOurTools.module.tsx"));
const DesktopOurTools2 = lazy(() => import("./components/sections/desktop/DesktopOurTools2/DesktopOurTools2.module.tsx"));
const DesktopContact = lazy(() => import("./components/sections/desktop/DesktopContact/DesktopContact.module.tsx"));
const DesktopTransition = lazy(() => import("./components/sections/desktop/DesktopTransition/DesktopTransition.module.tsx"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) setLoading(false);
    }, onboardingDuration * 1000);
    return () => clearTimeout(timeoutId);
  }, [loading]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        if (location.hash) scrollToElementWithId(null, location.hash, 0);
      },
      onboardingDuration * 1000 + 200,
    );
    return () => clearTimeout(timeoutId);
  }, [location]);

  return loading ? (
    <Onboarding />
  ) : (
    <>
      {false && window.innerWidth <= 1536 ? (
        <>{/*<MobileIntro />*/}</>
      ) : (
        <>
          <Cursor />

          <DesktopIntro />
          <DesktopTransition toId="Before-DesktopWhoWeAre" pageNumber="02" pageTitle="WHO WE ARE" nextSectionId="DesktopWhoWeAre" />
          <DesktopWhoWeAre />
          <DesktopTransition toId="Before-DesktopWhatWeDo" pageNumber="03" pageTitle="WHAT WE DO" nextSectionId="DesktopWhatWeDo" />
          <DesktopWhatWeDo />
          <DesktopTransition toId="Before-DesktopOurTools" pageNumber="04" pageTitle="OUR TOOLS" nextSectionId="DesktopOurTools" />
          <DesktopOurTools />
          <DesktopOurTools2 />
          <DesktopTransition toId="Before-DesktopContact" pageNumber="05" pageTitle="CONTACT" nextSectionId="DesktopContact" />
          <DesktopContact />
        </>
      )}
    </>
  );
}
