import style from "./MobileWhatWeDo.module.scss";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimCfg } from "../../../../assets/config/AnimCfg.tsx";
import Circle from "../../../circle/Circle.module.tsx";
import { useState, useEffect } from "react";
import MobileNavigation from "../components/mobileNavigation/MobileNavigation.module.tsx";
import notino from "../../../../assets/images/notino.jpg";
import livestreaming from "../../../../assets/images/livestreaming.jpg";
import richly from "../../../../assets/images/richly.jpg";
import kresleni from "../../../../assets/images/kresleni.jpg";
import research from "../../../../assets/images/research.jpg";
import email from "../../../../assets/images/email.jpg";
import { motion } from "framer-motion";
import LinesByLetter from "../../../linesByLetter/LinesByLetter.tsx";

function LineWithDetail({ anim, data }: { anim: any; data: { title: string; image: any; detail: string; id: number } }) {
  const [openDetail, setOpenDetail] = useState("start");
  const [first, setFirst] = useState(false);
  useEffect(() => {
    if (openDetail === "end") {
      const timeoutId = setTimeout(() => {
        setOpenDetail("start");
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [openDetail]);

  const toggleDetail = () => {
    if (openDetail === "visible") {
      setOpenDetail("end");
    }

    if (openDetail === "start") {
      setOpenDetail("visible");
      if (!first) setFirst(true);
    }
  };
  const variants = {
    start: {
      x: "100vw",
      display: "none",
    },
    visible: {
      x: 0,
      display: "block",
    },
    end: {
      x: "-100vw",
      display: "none",
    },
  };

  return (
    <>
      {data.id % 2 === 1 ? (
        <div className={style.lineContainer} onClick={toggleDetail}>
          <motion.img src={data.image} alt="" className={style.lineImageLeft} {...anim.lineImage} />
          <div className={style.lineTextLeftContainer}>
            {data.title.split(" ").map((line, index) => (
              <div className={style.wordContainer} key={index}>
                { index !== 0 && data.title.split(" ").length > 1 ? 
                <div className={style.characterContainer}>
                  <motion.span className={style.lineText} {...anim.line}>
                    {"\u00A0"}
                  </motion.span> </div> : null
                }
                {line.split("").map((c, i) => (
                <div className={style.characterContainer} key={i}>
                  <motion.span className={style.lineText} {...anim.line}>
                    {c}
                  </motion.span>
                </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={style.lineContainer} onClick={toggleDetail}>
          <motion.img src={data.image} alt="" className={style.lineImageRight} {...anim.lineImage} />
          <div className={style.lineTextRightContainer}>
          {data.title.split(" ").map((line, index) => (
            <div className={style.wordContainer} key={index}>
              {line.split("").map((c, i) => (
                <div className={style.characterContainer} key={i}>
                  <motion.span className={style.lineText} {...anim.line}>
                    {c}
                  </motion.span>
                </div>
              ))}
              { data.title.split(" ").length - 1 !== index ? 
              <div className={style.characterContainer}>
                <motion.span className={style.lineText} {...anim.line}>
                  {"\u00A0"}
                </motion.span> </div> : null
              }
            </div>
          ))}
          </div>
        </div>
      )}

      <motion.div animate={openDetail} variants={variants} className={style.detailContainer}>
        <div className={style.detailContentContainer}>
          <div className={style.lineTextContainer}>
            {data.title.split("").map((c, i) => (
              <div className={style.characterContainer} key={i}>
                <motion.span className={style.lineText} {...(anim && first ? anim.line : {})}>
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              </div>
            ))}
          </div>
          <motion.img src={data.image} alt="" className={style.detailImage} {...(anim && first ? anim.detailImage : {})} />

          <LinesByLetter anim={anim && first ? anim.smallLines : null} lines={[data.detail]} style={style} className="smallLinesText" />
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Circle anim={anim && first ? AnimCfg.general.inlineCircle(false) : null} direction="left" onClick={toggleDetail} />
        </div>
      </motion.div>
    </>
  );
}

function WhatWeDoContent({ anim }: { anim: any }) {
  const linesWithDetail = [
    {
      id: 0,
      title: "CONTENT ADAPTATIONS",
      detail:
        "Adapting global campaigns to local markets doesn’t have to be a headache. With smart, original tools, streamlined processes, and an experienced team, we make it smooth, fast, and cost-effective.",
      image: notino,
    },
    {
      id: 1,
      title: "PHOTOS & VIDEOS",
      detail:
        "From polished packshots to eye-catching social media content, all the way to creatively tailored campaigns that connect themes across the online universe. We bring ideas to life in images and video that speak volumes.",
      image: kresleni,
    },
    {
      id: 2,
      title: "WEBS & APPS",
      detail:
        "Communication that engages, easy and clear information sharing, tools for reaching out to customers, employees, or journalists, and even incorporating game elements into B2B communication. We seek elegant and maximally simple ways to utilize the natural potential of the online environment since we all carry it in our pockets nowadays.",
      image: research,
    },
    {
      id: 3,
      title: "CHATBOTS & AI",
      detail:
        "Why not use cleverly designed, entertaining, tireless, and always-ready companions for communicating topics on social media? They can happily introduce new products, advise on choosing and using the right products, or even handle an entire Instagram competition with thousands of participants 24/7.",
      image: email,
    },
    {
      id: 4,
      title: "LIVE STREAMS",
      detail:
        "Sometimes it’s just easier not to force everyone to arrive at one place at the same time just to share a few pieces of information or show what’s coming next. Online can often be not only more convenient and cheaper but also more interesting and better organized, especially when using a platform that helps invite only the right people.",
      image: livestreaming,
    },
    {
      id: 5,
      title: "STAFF AUGMENTATION",
      detail:
        "If you occasionally need to replace some team members or temporarily increase their capacities, we can help. Whether it’s a one-time or systematic support.",
      image: richly,
    },
  ];

  return (
    <>
      <div className={style.linesContainer}>
        {linesWithDetail.map((l, i) => (
          <LineWithDetail data={l} anim={anim ? anim.linesWithDetail : {}} key={i} />
        ))}
      </div>

      <Circle id="Before-MobileOurTools" anim={AnimCfg.general.circle(true)} />
    </>
  );
}

export default function MobileWhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="MobileWhatWeDo" className={`${style.contentContainer} contentContainer`} ref={ref} style={{ overflow: "hidden" }}>
      <MobileNavigation onlyActive={false} anim={AnimCfg.mobile.general.navigation(false)} activePage={3} />

      <WhatWeDoContent anim={isInView ? AnimCfg.mobile.whatWeDo.whatWeDoContent : null} />
    </section>
  );
}
