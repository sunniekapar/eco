import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card';

import { motion, AnimatePresence } from 'framer-motion';

type StyledCardProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCard = React.forwardRef<HTMLDivElement, StyledCardProps>(
  ({ className, ...props }, ref) => (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -32, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ height: '100%' }}
      >
        <Card
          ref={ref}
          className={cn(
            'bg-card/20 border-green-900/30 hover:border-green-900/50 transition duration-500 hover:shadow-[rgba(20,_83,_45,_0.3)_0px_0px_16px] shadow-[rgba(20,_83,_45,_0.2)_0px_0px_16px]',
            className
          )}
          {...props}
        />
      </motion.div>
    </AnimatePresence>
  )
);
StyledCard.displayName = 'StyledCard';

export default StyledCard;

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
