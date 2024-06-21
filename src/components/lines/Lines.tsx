import { motion } from "framer-motion";

/**
 * @description vykreslí řádky z pole a přidá jim animaci a styl
 * @param anim animace řádků musí být v property .line
 * @param lines pole řádků
 * @param style styl řádku musí být .className { .lineText {} }
 * @param className ve výchozím stavu "linesText"
 */
export default function Lines({
  anim,
  lines,
  style,
  className = "linesText",
}: {
  anim: any;
  lines: string[];
  style: any;
  className?: string;
}) {
  function Line({ text, index }: { text: string; index: number }) {
    return (
      <div>
        <motion.span {...(anim ? anim.line(index) : {})} className={style.lineText}>
          {text}
        </motion.span>
      </div>
    );
  }

  return (
    <div className={style[className]}>
      {lines.map((line, i) => (
        <Line text={line} index={i} key={i} />
      ))}
    </div>
  );
}
