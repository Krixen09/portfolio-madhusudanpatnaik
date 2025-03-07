
import { useEffect, useRef, useState } from 'react';

// Custom hook for applying animations when an element enters the viewport
export const useInView = (threshold = 0.1, rootMargin = '0px') => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, isInView]);

  return { ref, isInView };
};

// Hook for staggered child animations
export const useStaggeredChildren = (
  numberOfChildren: number,
  baseDelay = 100,
  startOn = true
) => {
  return Array.from({ length: numberOfChildren }).map((_, i) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: startOn ? 1 : 0,
      y: startOn ? 0 : 20,
      transition: {
        duration: 0.5,
        delay: baseDelay * i * 0.001,
      },
    },
  }));
};

// Hook for parallax effect
export const useParallax = (factor = 0.1) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return offset * factor;
};

// Utility for calculating staggered animation delays
export const staggerDelay = (index: number, baseDelay = 100) => {
  return {
    animationDelay: `${index * baseDelay}ms`,
    style: { animationDelay: `${index * baseDelay}ms` },
  };
};
