
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedCursor from '@/components/AnimatedCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Preload critical assets
    const preloadImages = () => {
      // Add any critical images here if needed
    };
    
    preloadImages();
    
    // Show welcome toast after a delay
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to my portfolio",
        description: "Explore my projects and skills in cybersecurity",
        duration: 5000,
      });
    }, 2000);
    
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL without triggering scroll
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [toast]);
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <AnimatedCursor />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
