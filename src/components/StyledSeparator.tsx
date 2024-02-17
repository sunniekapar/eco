import * as React from 'react';
import { cn } from '@/lib/utils';
import { Separator as BaseSeparator } from '@/components/ui/separator'; 

type StyledSeparatorProps = React.ComponentPropsWithoutRef<typeof BaseSeparator> & {
  additionalClassName?: string; 
};

const StyledSeparator = React.forwardRef<React.ElementRef<typeof BaseSeparator>, StyledSeparatorProps>(
  ({ additionalClassName, ...props }, ref) => (
    <BaseSeparator 
      ref={ref}
      {...props}
      className={cn(
        "rounded bg-gradient-to-r via-green-900 to-green-900/20 from-green-900/20", 
        additionalClassName
      )}
    />
  )
);

StyledSeparator.displayName = "StyledSeparator";

// Default export the StyledSeparator component
export default StyledSeparator;
