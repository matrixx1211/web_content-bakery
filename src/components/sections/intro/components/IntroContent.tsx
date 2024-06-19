import { useState } from "react";
import notino from "../../../../assets/images/notino.jpg";
import livestreaming from "../../../../assets/images/livestreaming.jpg";
import richly from "../../../../assets/images/richly.jpg";
import kresleni from "../../../../assets/images/kresleni.jpg";
import Lines from "./Lines.tsx";
import FocusableImage from "./FocusableImage.tsx";

export default function IntroContent({ anim }: { anim: any }) {
  const [imageFocus, setImageFocus] = useState({ anim: "initial", image: -1 });
  const imageFocusEnter = (index: number) => setImageFocus({ anim: "focus", image: index });
  const imageFocusLeave = () => setImageFocus({ anim: "default", image: -1 });

  const images = [
    { src: notino, x: "-", y: "-" },
    { src: livestreaming, x: "+", y: "-" },
    { src: richly, x: "-", y: "+" },
    { src: kresleni, x: "+", y: "+" },
  ];

  return (
    <>
      <Lines imageFocus={imageFocus} anim={anim.lines} />

      {images.map((image, index) => {
        const data = {
          ...image,
          isFocused: imageFocus.image === index,
          onMouseEnter: () => imageFocusEnter(index),
          onMouseLeave: imageFocusLeave,
          variant: imageFocus.anim,
        };
        return <FocusableImage {...data} key={index} anim={anim.focusableImage} />;
      })}
    </>
  );
}
