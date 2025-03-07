
import React from 'react';
import { Shield, Github, Linkedin, Twitter, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-cyber-dark py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Shield className="w-8 h-8 text-cyber-blue mr-2" />
            <span className="text-xl font-bold tracking-tight text-white">
              <span style={{fontSize:"1.7rem"}}>Madhu Sudhan Patnaik</span>
            </span>
          </div>
          
          <div className="flex space-x-4">
            <SocialLink href="https://github.com/madhusudanpatnaik" icon={<Github className="w-5 h-5" />} />
            <SocialLink href="https://www.linkedin.com/in/madhusudanpatnaik/" icon={<Linkedin className="w-5 h-5" />} />
            <SocialLink href="https://x.com/madhusudan91263" icon={<Twitter className="w-5 h-5" />} />
          </div>
        </div>
        
        <div className="border-t border-cyber-blue/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-cyber-gray text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} All rights reserved.
          </div>
          
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-cyber-blue/10 text-cyber-blue flex items-center justify-center hover:bg-cyber-blue/20 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-cyber-blue/10 text-cyber-blue flex items-center justify-center hover:bg-cyber-blue/20 transition-colors duration-300"
      aria-label="Social media link"
    >
      {icon}
    </a>
  );
};

export default Footer;
