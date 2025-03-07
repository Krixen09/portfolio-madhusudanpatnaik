
import React from 'react';
import Section from './ui/Section';
import { staggerDelay } from '@/lib/animations';

const Skills: React.FC = () => {
  const categories = [
    {
      name: 'Offensive Security',
      skills: [
        { name: 'Penetration Testing', level: 95 },
        { name: 'Vulnerability Assessment', level: 90 },
        { name: 'Exploit Development', level: 85 },
        { name: 'Social Engineering', level: 80 },
      ],
    },
    {
      name: 'Defensive Security',
      skills: [
        { name: 'Incident Response', level: 90 },
        { name: 'Security Monitoring', level: 85 },
        { name: 'Threat Intelligence', level: 85 },
        { name: 'Malware Analysis', level: 75 },
      ],
    },
    {
      name: 'Tools & Technologies',
      skills: [
        { name: 'Kali Linux', level: 95 },
        { name: 'Wireshark', level: 90 },
        { name: 'Metasploit', level: 85 },
        { name: 'Burp Suite', level: 90 },
        { name: 'SIEM Platforms', level: 80 },
      ],
    },
  ];
  
  const certifications = [
    { name: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', year: '2019' },
    { name: 'Offensive Security Certified Professional (OSCP)', issuer: 'Offensive Security', year: '2020' },
    { name: 'Certified Information Systems Security Professional (CISSP)', issuer: 'ISC²', year: '2021' },
    { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2018' },
  ];
  
  return (
    <Section
      id="skills"
      title="MY EXPERTISE"
      subtitle="Professional Skills"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white">Technical Proficiency</h3>
          
          {categories.map((category, categoryIndex) => (
            <div key={category.name} className="mb-10" {...staggerDelay(categoryIndex, 200)}>
              <h4 className="text-lg font-medium text-cyber-blue mb-4">{category.name}</h4>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2" {...staggerDelay(skillIndex, 100)}>
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-cyber-gray">{skill.level}%</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-cyber-dark/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyber-blue rounded-full animate-shimmer"
                        style={{ width: `${skill.level}%`, animationDelay: `${categoryIndex * 100 + skillIndex * 150}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-8 text-white">Certifications</h3>
          
          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <div 
                key={cert.name}
                className="glass rounded-lg p-6 transition-all duration-300 hover:bg-cyber-dark/50 group"
                {...staggerDelay(index, 200)}
              >
                <h4 className="text-xl font-bold mb-2 text-white group-hover:text-cyber-blue transition-colors duration-300">
                  {cert.name}
                </h4>
                
                <div className="flex justify-between text-sm text-cyber-gray">
                  <span>{cert.issuer}</span>
                  <span>{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-white">Experience Highlights</h3>
            
            <ul className="space-y-3 text-cyber-gray list-disc list-inside">
              <li>Led security audits for Fortune 500 companies</li>
              <li>Discovered critical vulnerabilities in financial software</li>
              <li>Developed custom security tools for specialized assessments</li>
              <li>Trained security teams on advanced threat detection</li>
              <li>Implemented zero-trust architecture for enterprise clients</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
