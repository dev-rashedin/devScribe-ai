import { motion } from 'motion/react';
import { Highlight } from "./index";


const HighlightedText = ({label, className} : {label: string, className?: string}) => {
  return (
    <motion.h1
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <Highlight className={`text-secondary ${className}`}>
      {label}
      </Highlight>
    </motion.h1>
  );
}
export default HighlightedText