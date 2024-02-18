import * as React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

type StyledSeparatorProps = React.ComponentPropsWithoutRef<typeof Separator> & {
  additionalClassName?: string;
};

const StyledSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  StyledSeparatorProps
>(({ additionalClassName, ...props }, ref) => (
  <Separator
    ref={ref}
    {...props}
    className={cn(
      'rounded bg-gradient-to-r via-green-900 to-green-900/20 from-green-900/20',
      additionalClassName
    )}
  />
));

StyledSeparator.displayName = 'StyledSeparator';

export default StyledSeparator;
