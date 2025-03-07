
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Shield, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-cyber-dark/70 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center space-x-2 text-white group">
          <Shield className="w-8 h-8 text-cyber-blue group-hover:text-cyber-teal transition-colors duration-300" />
          <span className="text-xl font-bold tracking-tight">
            <span style={{fontSize:"1.7rem"}}>Madhu Sudhan Patnaik</span>
          </span>
        </a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        {/* Mobile menu */}
        <div 
          className={cn(
            'fixed inset-0 bg-cyber-dark/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8 transition-all duration-300 ease-in-out md:hidden',
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
        >
          <NavLink href="#home" mobile onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink href="#about" mobile onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink href="#skills" mobile onClick={() => setMobileMenuOpen(false)}>Skills</NavLink>
          <NavLink href="#projects" mobile onClick={() => setMobileMenuOpen(false)}>Projects</NavLink>
          <NavLink href="#contact" mobile onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  mobile?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, mobile = false, onClick, children }) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className={cn(
        'relative group hover:text-cyber-blue transition-colors duration-300 hover-underline',
        mobile ? 'text-2xl font-medium' : 'text-sm font-medium uppercase tracking-wider'
      )}
    >
      {children}
    </a>
  );
};

export default Navbar;
