
import React, { useEffect, useState } from 'react';
import SecurityScene from './3d/SecurityScene';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [showFullText, setShowFullText] = useState(false);
  const textToType = 'Cybersecurity Expert & Ethical Hacker';
  
  useEffect(() => {
    if (showFullText) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowFullText(true), 1000);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [showFullText]);
  
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-cyber-black bg-opacity-90">
          <SecurityScene />
        </div>
        
        {/* Background grid overlay */}
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20"></div>
      </div>
      
      {/* Content */}
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center md:text-left md:max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight text-white">
            <span>Protecting Digital Assets &</span>
            <br />
            <span className="text-gradient text-glow">Securing Networks</span>
          </h1>
          
          <div className="h-12 mb-6">
            {showFullText ? (
              <p className="text-xl md:text-2xl font-medium text-white animate-fade-in">
                <span className="text-cyber-blue">$ </span>
                <span className="code-text">{textToType}</span>
                <span className="inline-block w-2.5 h-5 bg-cyber-teal ml-1 animate-pulse"></span>
              </p>
            ) : (
              <p className="text-xl md:text-2xl font-medium text-white">
                <span className="text-cyber-blue">$ </span>
                <span className="code-text">{typedText}</span>
                <span className="inline-block w-2.5 h-5 bg-cyber-teal ml-1 animate-pulse"></span>
              </p>
            )}
          </div>
          
          <p className="text-lg text-cyber-gray mb-8 max-w-xl mx-auto md:mx-0">
            Specializing in vulnerability assessment, penetration testing, and 
            implementing robust security measures to protect your organization against cyber threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-cyber-blue text-cyber-black font-medium rounded-md hover:bg-cyber-teal transition-colors duration-300 text-sm uppercase tracking-wider box-glow"
            >
              Hire Me
            </a>
            
            <a 
              href="#projects" 
              className="px-8 py-3 bg-transparent border border-cyber-blue text-cyber-blue font-medium rounded-md hover:bg-cyber-blue/10 transition-colors duration-300 text-sm uppercase tracking-wider"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer animate-float"
        onClick={scrollToNextSection}
      >
        <ChevronDown className="w-8 h-8 text-cyber-blue" />
      </div>
      
      {/* Horizontal lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyber-blue/20"></div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="bg-line bottom-0"></div>
      </div>
    </section>
  );
};

export default Hero;
