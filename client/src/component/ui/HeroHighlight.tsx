import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../lib/utils';

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ backgroundSize: '0% 100%' }}
      animate={{ backgroundSize: '100% 100%' }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline-block',
      }}
      className={cn(
        `relative inline-block rounded-lg primary-gradient px-1 pb-1`,
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        style={{ display: 'inline-block', transformOrigin: 'left' }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};
