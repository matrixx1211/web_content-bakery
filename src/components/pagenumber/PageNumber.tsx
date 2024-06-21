import { motion } from "framer-motion";

export default function PageNumber({ number, anim, style }: { number: string; anim: any; style: any }) {
  return (
    <motion.div className={style.pageIndicator} {...(anim ? anim.pageIndicator : {})}>
      <motion.span className={style.pageNumber} {...(anim ? anim.pageNumber : {})}>
        {number}
      </motion.span>
    </motion.div>
  );
}
