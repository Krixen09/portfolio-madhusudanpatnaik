
import React from 'react';
import Section from './ui/Section';
import { ArrowRight, ShieldCheck, Terminal, Lock, Network } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Section
      id="about"
      title="ABOUT ME"
      subtitle="Defending Digital Frontiers"
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg text-cyber-gray leading-relaxed mb-4">
              With over <span className="font-bold text-cyber-blue">4 years of experience</span> in 
              cybersecurity, I've helped organizations identify vulnerabilities, implement security 
              best practices, and respond to cyber threats.
            </p>
            
            <p className="text-lg text-cyber-gray leading-relaxed mb-4">
              My approach combines technical expertise with strategic thinking to protect critical 
              digital assets. I believe effective security is about building <span className="font-bold text-cyber-blue">resilient systems</span> that 
              balance protection with usability.
            </p>
            
            <p className="text-lg text-cyber-gray leading-relaxed">
              I stay at the forefront of the industry, constantly learning about emerging threats and 
              countermeasures. My goal is to help businesses <span className="font-bold text-cyber-blue">navigate the complex cybersecurity 
              landscape</span> with confidence.
            </p>
          </div>
          
          <a 
            href="#skills" 
            className="inline-flex items-center text-cyber-blue hover:text-cyber-teal transition-colors duration-300 group"
          >
            <span className="mr-2">View my expertise</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div>
          <div className="glass rounded-lg p-6 mb-6 relative group perspective-container">
            <div className="transform-3d group-hover:rotate-y-3 group-hover:scale-[1.02]">
              <FeatureCard 
                icon={<ShieldCheck className="w-6 h-6 text-cyber-blue" />}
                title="Security Audit"
                description="Comprehensive security assessments to identify vulnerabilities in your systems."
              />
            </div>
          </div>
          
          <div className="glass rounded-lg p-6 mb-6 relative group perspective-container">
            <div className="transform-3d group-hover:rotate-y-3 group-hover:scale-[1.02]">
              <FeatureCard 
                icon={<Terminal className="w-6 h-6 text-cyber-teal" />}
                title="Penetration Testing"
                description="Simulated cyber attacks to test your defenses against real threats."
              />
            </div>
          </div>
          
          <div className="glass rounded-lg p-6 relative group perspective-container">
            <div className="transform-3d group-hover:rotate-y-3 group-hover:scale-[1.02]">
              <FeatureCard 
                icon={<Network className="w-6 h-6 text-cyber-green" />}
                title="Security Strategy"
                description="Developing robust security roadmaps aligned with business objectives."
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-cyber-gray">{description}</p>
    </div>
  );
};

export default About;
