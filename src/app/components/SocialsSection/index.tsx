import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink, X } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/elghaied',
    icon: <Github className="h-6 w-6" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/elghaied',
    icon: <Linkedin className="h-6 w-6" />,
  },

  {
    name: 'Email',
    url: 'mailto:elghaied.eslam@gmail.com',
    icon: <Mail className="h-6 w-6" />,
  },
  // Add more social links as needed
];

const SocialsSection: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Connect With Me</h2>
      <div className="flex justify-center items-center gap-4 flex-wrap">
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg hover:-translate-y-1"
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
              {link.icon}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialsSection;
