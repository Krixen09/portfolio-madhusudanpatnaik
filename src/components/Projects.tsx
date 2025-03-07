
import React, { useState } from 'react';
import Section from './ui/Section';
import { ExternalLink, FolderGit2, Shield, Server, Lock } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'security' | 'software' | 'consulting'>('all');
  
  const projects = [
    {
      id: 1,
      title: 'Advanced Threat Detection System',
      description: 'Developed a machine learning-based system to detect and respond to zero-day exploits in real-time.',
      tags: ['Python', 'TensorFlow', 'Elasticsearch'],
      icon: <Shield className="w-5 h-5" />,
      category: 'security',
    },
    {
      id: 2,
      title: 'Secure Code Review Platform',
      description: 'Built a collaborative platform for secure code reviews with automated vulnerability detection.',
      tags: ['JavaScript', 'Node.js', 'Docker'],
      icon: <FolderGit2 className="w-5 h-5" />,
      category: 'software',
    },
    {
      id: 3,
      title: 'Financial Institution Security Audit',
      description: 'Conducted comprehensive security assessment for a major financial institution, identifying critical vulnerabilities.',
      tags: ['Penetration Testing', 'Risk Assessment', 'Compliance'],
      icon: <Server className="w-5 h-5" />,
      category: 'consulting',
    },
    {
      id: 4,
      title: 'Encrypted Communication Protocol',
      description: 'Designed and implemented a secure communication protocol with end-to-end encryption for IoT devices.',
      tags: ['Cryptography', 'IoT', 'C++'],
      icon: <Lock className="w-5 h-5" />,
      category: 'security',
    },
    {
      id: 5,
      title: 'Security Operations Center (SOC)',
      description: 'Designed and implemented a 24/7 SOC with custom playbooks and automated incident response.',
      tags: ['SIEM', 'Incident Response', 'Automation'],
      icon: <Shield className="w-5 h-5" />,
      category: 'consulting',
    },
    {
      id: 6,
      title: 'Vulnerability Management System',
      description: 'Created a centralized platform to track, prioritize, and remediate vulnerabilities across the enterprise.',
      tags: ['React', 'GraphQL', 'PostgreSQL'],
      icon: <FolderGit2 className="w-5 h-5" />,
      category: 'software',
    },
  ];
  
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
    
  return (
    <Section
      id="projects"
      title="MY WORK"
      subtitle="Featured Projects"
      dark
    >
      {/* Tabs */}
      <div className="flex flex-wrap justify-center mb-12 space-x-2">
        <TabButton 
          active={activeTab === 'all'} 
          onClick={() => setActiveTab('all')}
        >
          All Projects
        </TabButton>
        
        <TabButton 
          active={activeTab === 'security'} 
          onClick={() => setActiveTab('security')}
        >
          Security Tools
        </TabButton>
        
        <TabButton 
          active={activeTab === 'software'} 
          onClick={() => setActiveTab('software')}
        >
          Software Development
        </TabButton>
        
        <TabButton 
          active={activeTab === 'consulting'} 
          onClick={() => setActiveTab('consulting')}
        >
          Consulting
        </TabButton>
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 mb-2 ${
        active 
          ? 'bg-cyber-blue text-cyber-black box-glow' 
          : 'bg-cyber-dark/50 text-cyber-gray hover:bg-cyber-dark'
      }`}
    >
      {children}
    </button>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    icon: React.ReactNode;
    category: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="glass rounded-lg overflow-hidden group perspective-container"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="transform-3d group-hover:rotate-y-3 group-hover:scale-[1.02] h-full">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-cyber-blue/10 flex items-center justify-center text-cyber-blue">
              {project.icon}
            </div>
            
            <a 
              href="#" 
              className="text-cyber-gray hover:text-cyber-blue transition-colors duration-300"
              aria-label="View project details"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyber-blue transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-cyber-gray mb-6 flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex} 
                className="px-2 py-1 text-xs bg-cyber-blue/10 text-cyber-blue rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
