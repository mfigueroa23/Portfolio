import { Component } from '@angular/core';
import { Button } from '../../components/button/button';
import { AnimatedButton } from '../../components/animated-button/animated-button';

@Component({
  imports: [Button, AnimatedButton],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {
  public greenDots = Array.from({ length: 30 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animation: `slow-drift ${15 + Math.random() * 30}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 2}s`,
  }));
  public socialLinks: { icon: string; href: string }[] = [
    { icon: 'fa-brands fa-github', href: 'https://github.com/mfigueroa23' },
    { icon: 'fa-brands fa-linkedin', href: 'https://www.linkedin.com/in/mfigueroa23' },
    { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/marcoo_f23' },
    { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/marcoo.f23' },
    { icon: 'fa-brands fa-soundcloud', href: 'https://soundcloud.com/devsonic' },
  ];
  private technologies = [
    'Angular',
    'TypeScript',
    'Node.js',
    'NestJS',
    'React',
    'JavaScript',
    'PostgreSQL',
    'MySQL',
    'Docker',
    'Kubernetes',
    'Linux',
    'Bash',
    'GitHub Actions',
    'Git',
    'Tailwind CSS',
    'Nginx',
    'Ubuntu Server',
    'Cloudflare',
    'Terraform',
    'AWS',
    'Vercel',
    'Grafana',
    'Python',
    'Spring Boot',
    '.NET',
    'SQL Server',
    'Windows Server',
    'n8n',
    'GitHub',
    'Jira',
    'Confluence',
  ];
  public techStack = [...this.technologies, ...this.technologies];
}
