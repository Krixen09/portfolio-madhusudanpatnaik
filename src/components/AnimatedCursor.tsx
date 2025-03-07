
import React, { useEffect, useRef, useState } from 'react';

const AnimatedCursor: React.FC = () => {
  const outerCursorRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Create cursor trails
    const trailCount = 5;
    trailsRef.current = Array(trailCount).fill(0).map((_, i) => {
      const trail = document.createElement('div');
      trail.className = 'pointer-events-none fixed top-0 left-0 z-40 mix-blend-difference rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500';
      trail.style.width = `${6 + i}px`;
      trail.style.height = `${6 + i}px`;
      trail.style.backgroundColor = 'rgba(51, 195, 240, 0.3)';
      trail.style.transitionDelay = `${i * 30}ms`;
      document.body.appendChild(trail);
      return trail;
    });
    
    // Show cursor only after it's positioned correctly
    setTimeout(() => setIsVisible(true), 100);
    
    const innerCursor = innerCursorRef.current;
    const outerCursor = outerCursorRef.current;
    
    if (!innerCursor || !outerCursor) return;
    
    // Mouse movement handler
    const moveCursor = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      
      // Update main cursors
      requestAnimationFrame(() => {
        if (innerCursor && outerCursor) {
          innerCursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
          outerCursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
        
        // Update trail elements with staggered delay
        trailsRef.current.forEach((trail, i) => {
          setTimeout(() => {
            trail.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            trail.style.opacity = '1';
          }, i * 40);
        });
      });
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseEnter = () => {
      document.body.style.cursor = 'none';
      setIsVisible(true);
      trailsRef.current.forEach(trail => {
        trail.style.opacity = '1';
      });
    };
    
    const handleMouseLeave = () => {
      document.body.style.cursor = 'auto';
      setIsVisible(false);
      trailsRef.current.forEach(trail => {
        trail.style.opacity = '0';
      });
    };
    
    // Handle hoverable elements
    const handleLinkHoverStart = () => setIsHovering(true);
    const handleLinkHoverEnd = () => setIsHovering(false);
    
    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Find all clickable/hoverable elements and add listeners
    const hoverableElements = document.querySelectorAll('a, button, input, [data-hoverable]');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
      
      // Remove trail elements
      trailsRef.current.forEach(trail => {
        document.body.removeChild(trail);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        ref={innerCursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 w-3 h-3 bg-cyber-teal rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${isClicking ? 'scale-75' : 'scale-100'}`}
      />
      <div 
        ref={outerCursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-49 w-7 h-7 border border-cyber-blue rounded-sm transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${isHovering ? 'scale-150 bg-cyber-blue/10 rounded-full' : isClicking ? 'scale-75 rotate-45' : 'scale-100'}`}
      />
    </>
  );
};

export default AnimatedCursor;
