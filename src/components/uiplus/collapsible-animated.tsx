'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '~/lib/utils';

const MotionCollapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>((props, ref) => <CollapsiblePrimitive.Root ref={ref} {...props} />);
MotionCollapsible.displayName = 'MotionCollapsible';

const MotionCollapsibleTrigger = CollapsiblePrimitive.Trigger;

const MotionCollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  { open?: boolean } & React.ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.Content
  >
>(({ className, children, open, ...props }, ref) => (
  <CollapsiblePrimitive.Content ref={ref} forceMount asChild {...props}>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="motion-content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className={cn('overflow-hidden', className)}
        >
          <div>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </CollapsiblePrimitive.Content>
));
MotionCollapsibleContent.displayName = 'MotionCollapsibleContent';

export {
  MotionCollapsible,
  MotionCollapsibleTrigger,
  MotionCollapsibleContent,
};
