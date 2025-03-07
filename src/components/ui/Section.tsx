
import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/lib/animations';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  className?: string;
  contentClassName?: string;
  dark?: boolean;
  animateOnce?: boolean;
  from?: 'left' | 'right' | 'bottom';
  delay?: number;
  children: React.ReactNode;
}

const Section = ({
  title,
  subtitle,
  fullWidth = false,
  className,
  contentClassName,
  dark = false,
  animateOnce = true,
  from = 'bottom',
  delay = 0,
  children,
  ...props
}: SectionProps) => {
  const { ref, isInView } = useInView(0.1);

  // Animation classes based on direction
  const getAnimationClass = () => {
    if (!isInView && !animateOnce) return 'opacity-0 ';
    
    if (from === 'left') {
      return isInView ? 'animate-fade-in-up translate-x-0' : '-translate-x-10 opacity-0';
    }
    if (from === 'right') {
      return isInView ? 'animate-fade-in-up translate-x-0' : 'translate-x-10 opacity-0';
    }
    // Default bottom
    return isInView ? 'animate-fade-in-up translate-y-0' : 'translate-y-10 opacity-0';
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'relative w-full section-padding transition-all duration-700 ease-out',
        dark ? 'bg-cyber-dark/40' : 'bg-transparent',
        className
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      <div
        className={cn(
          'relative w-full mx-auto transition-all duration-700',
          !fullWidth && 'container max-w-6xl',
          getAnimationClass()
        )}
      >
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <div className="inline-block mb-2">
                <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-cyber-blue/10 text-cyber-blue mb-2">
                  {title}
                </span>
              </div>
            )}
            {subtitle && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {subtitle}
              </h2>
            )}
          </div>
        )}
        <div
          className={cn('relative z-10', contentClassName)}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
