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

type StyledCardProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCard = React.forwardRef<HTMLDivElement, StyledCardProps>(
  ({ className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        'animate-appear fill-mode-backwards bg-card/20 border-green-900/30 hover:border-green-900/50 transition duration-500 hover:shadow-[rgba(20,_83,_45,_0.3)_0px_0px_16px] shadow-[rgba(20,_83,_45,_0.2)_0px_0px_16px]',
        className
      )}
      {...props}
    />
  )
);
StyledCard.displayName = 'StyledCard';

export default StyledCard;

export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
