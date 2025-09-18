'use client';

import { useSidebar } from '~/components/ui/sidebar';
import { ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export function SidebarTrigger({
  className,
}: {
  className?: string;
}) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'absolute left-0 top-1/2 -mt-6 size-8 rounded-l-none rounded-r-md bg-muted/70 hover:bg-muted transition-colors duration-300 shadow-md',
        className
      )}
      onClick={toggleSidebar}
      aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      <ArrowRight
        className={cn(
          'h-4 w-4 text-muted-foreground transition-transform duration-300 ease-in-out',
          open ? 'rotate-0' : 'rotate-180'
        )}
      />
    </Button>
  );
}