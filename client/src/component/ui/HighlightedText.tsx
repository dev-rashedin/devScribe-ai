import { motion } from 'motion/react';
import { Highlight } from "./index";


const HighlightedText = ({label, className} : {label: string, className?: string}) => {
  return (
    <motion.h1
      
    >
      <Highlight className={`text-secondary ${className}`}>
      {label}
      </Highlight>
    </motion.h1>
  );
}
export default HighlightedText