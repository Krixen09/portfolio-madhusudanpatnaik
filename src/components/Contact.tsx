import React, { useState } from 'react';
import Section from './ui/Section';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Add Telegram bot configuration
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your actual bot token
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your actual chat ID

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const sendTelegramNotification = async (data: typeof formData) => {
    const message = `
📨 New Contact Form Submission

👤 Name: ${data.name}
📧 Email: ${data.email}
📝 Subject: ${data.subject}
💬 Message: ${data.message}
    `;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send Telegram notification');
      }
      
      return true;
    } catch (err) {
      console.error('Error sending Telegram notification:', err);
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send form data to Telegram
      const telegramSuccess = await sendTelegramNotification(formData);
      
      if (!telegramSuccess) {
        throw new Error('Failed to send message to Telegram');
      }
      
      console.log('Form submitted:', formData);
      setSuccess(true);
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Section
      id="contact"
      title="GET IN TOUCH"
      subtitle="Contact Me"
      >
      <h3 className="text-2xl font-bold mb-6 text-white text-center md:text-left">Let's Talk</h3> 
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          {/* Profile image added here */}
          <div className="flex justify-center mb-8">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-cyber-blue/30 box-glow">
              {/* Replace with your actual image path */}
              <img 
                src="/images/JQ8l4qQx_400x400.jpg" 
                alt="Madhusudan Sathujoda" 
                className="w-full h-full object-cover"
              />
              {/* Cybersecurity-themed overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 to-cyber-teal/10 mix-blend-overlay"></div>
              <div className="absolute inset-0 border border-cyber-blue/20 rounded-full"></div>
            </div>
          </div>
          
          
          <p className="text-cyber-gray mb-8">
            Ready to enhance your security posture? Let's discuss how I can help
            protect your digital assets from evolving cyber threats.
          </p>
          
          <div className="space-y-6">
            <ContactInfo 
              icon={<Mail className="w-5 h-5 text-cyber-blue" />}
              label="Email"
              value="Madhusudansathujoda@gmail.com"
            />
            
            <ContactInfo 
              icon={<Phone className="w-5 h-5 text-cyber-blue" />}
              label="Phone"
              value="+91 93473 79566"
            />
            
            <ContactInfo 
              icon={<MapPin className="w-5 h-5 text-cyber-blue" />}
              label="Location"
              value="Vishakapatna, Andhra Pradesh, IN"
            />
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="glass rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-cyber-gray mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 focus:border-cyber-blue/50 text-white"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cyber-gray mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 focus:border-cyber-blue/50 text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-cyber-gray mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 focus:border-cyber-blue/50 text-white"
                  placeholder="How can I help you?"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-cyber-gray mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-cyber-dark/50 border border-cyber-blue/20 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue/50 focus:border-cyber-blue/50 text-white resize-none"
                  placeholder="Your message here..."
                />
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-cyber-blue text-cyber-black font-medium rounded-md hover:bg-cyber-teal transition-colors duration-300 text-sm uppercase tracking-wider flex items-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'box-glow'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Sending</span>
                      <span className="flex h-4 w-4 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-teal opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-cyber-teal"></span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                {success && (
                  <div className="text-sm text-green-400 animate-fade-in mt-4 sm:mt-0">
                    Message sent successfully!
                  </div>
                )}
                
                {error && (
                  <div className="text-sm text-red-400 animate-fade-in mt-4 sm:mt-0">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

interface ContactInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-10 h-10 rounded-full bg-cyber-blue/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-cyber-gray mb-1">{label}</h4>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
};

export default Contact;