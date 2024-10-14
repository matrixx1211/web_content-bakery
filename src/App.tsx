import "./App.scss";
import { lazy, useEffect, useState } from "react";
import { onboardingDuration } from "./assets/config/AnimCfg.tsx";
import { scrollToElementWithId } from "./components/helpers/Helpers.tsx";
import { useLocation } from "react-router-dom";
const MobileIntro = lazy(() => import("./components/sections/mobile/MobileIntro/MobileIntro.module.tsx"));
const MobileWhoWeAre = lazy(() => import("./components/sections/mobile/MobileWhoWeAre/MobileWhoWeAre.module.tsx"));
const MobileWhatWeDo = lazy(() => import("./components/sections/mobile/MobileWhatWeDo/MobileWhatWeDo.module.tsx"));
const MobileOurTools = lazy(() => import("./components/sections/mobile/MobileOurTools/MobileOurTools.module.tsx"));
const MobileOurTools2 = lazy(() => import("./components/sections/mobile/MobileOurTools2/MobileOurTools2.module.tsx"));
const MobileOurTools3 = lazy(() => import("./components/sections/mobile/MobileOurTools3/MobileOurTools3.module.tsx"));
const MobileContact = lazy(() => import("./components/sections/mobile/MobileContact/MobileContact.module.tsx"));

const Onboarding = lazy(() => import("./components/sections/Onboarding/Onboarding.module.tsx"));
const Cursor = lazy(() => import("./components/cursor/Cursor.module.tsx"));
const DesktopIntro = lazy(() => import("./components/sections/desktop/DesktopIntro/DesktopIntro.module.tsx"));
const DesktopWhoWeAre = lazy(() => import("./components/sections/desktop/DesktopWhoWeAre/DesktopWhoWeAre.module.tsx"));
const DesktopWhatWeDo = lazy(() => import("./components/sections/desktop/DesktopWhatWeDo/DesktopWhatWeDo.module.tsx"));
const DesktopOurTools = lazy(() => import("./components/sections/desktop/DesktopOurTools/DesktopOurTools.module.tsx"));
const DesktopOurTools2 = lazy(() => import("./components/sections/desktop/DesktopOurTools2/DesktopOurTools2.module.tsx"));
const DesktopContact = lazy(() => import("./components/sections/desktop/DesktopContact/DesktopContact.module.tsx"));

const Transition = lazy(() => import("./components/sections/general/Transition/Transition.module.tsx"));

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
      {window.innerWidth < 1536 ? (
        <>
          <MobileIntro />
          <Transition toId="Before-MobileWhoWeAre" pageNumber="02" pageTitle="WHO WE ARE" nextSectionId="MobileWhoWeAre" />
          <MobileWhoWeAre />
          <Transition toId="Before-MobileWhatWeDo" pageNumber="03" pageTitle="WHAT WE DO" nextSectionId="MobileWhatWeDo" />
          <MobileWhatWeDo />
          <Transition toId="Before-MobileOurTools" pageNumber="04" pageTitle="OUR TOOLS" nextSectionId="MobileOurTools" />
          <MobileOurTools />
          <MobileOurTools2 />
          <MobileOurTools3 />
          <Transition toId="Before-MobileContact" pageNumber="05" pageTitle="CONTACT" nextSectionId="MobileContact" />
          <MobileContact />
        </>
      ) : (
        <>
          <Cursor />

          <DesktopIntro />
          <Transition toId="Before-DesktopWhoWeAre" pageNumber="02" pageTitle="WHO WE ARE" nextSectionId="DesktopWhoWeAre" />
          <DesktopWhoWeAre />
          <Transition toId="Before-DesktopWhatWeDo" pageNumber="03" pageTitle="WHAT WE DO" nextSectionId="DesktopWhatWeDo" />
          <DesktopWhatWeDo />
          <Transition toId="Before-DesktopOurTools" pageNumber="04" pageTitle="OUR TOOLS" nextSectionId="DesktopOurTools" />
          <DesktopOurTools />
          <DesktopOurTools2 />
          <Transition toId="Before-DesktopContact" pageNumber="05" pageTitle="CONTACT" nextSectionId="DesktopContact" />
          <DesktopContact />
        </>
      )}
    </>
  );
}
