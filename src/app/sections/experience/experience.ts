import { Component } from '@angular/core';

interface Job {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  current: boolean;
}

@Component({
  imports: [],
  selector: 'app-experience',
  styleUrl: './experience.css',
  templateUrl: './experience.html',
})
export class Experience {
  public experiences: Job[] = [
    {
      period: 'Sep 2026 — Present',
      role: 'Intern — Systems & Technology, AI Solutions',
      company: 'Autofin Chile',
      description:
        'Developing AI solutions with Python and FastAPI exposed through REST APIs, orchestrating agents and workflows with LangGraph to automate internal processes, and building Next.js interfaces to consume the AI services. Task management and technical documentation in Jira under Scrum.',
      technologies: ['Python', 'FastAPI', 'LangGraph', 'Next.js', 'Jira'],
      current: true,
    },
    {
      period: 'Mar 2025 — Apr 2025',
      role: 'Technical Support Agent',
      company: 'E-Cert Chile',
      description:
        'Handled and resolved customer technical requests by phone following company protocols, tracking cases and escalating them to specialized teams when required.',
      technologies: ['Technical Support', 'Incident Management'],
      current: false,
    },
    {
      period: 'Jul 2023 — Oct 2024',
      role: 'TLS/SSL Operator — System Administrator',
      company: 'E-SIGN S.A.',
      description:
        'Administered and maintained critical production systems, monitoring Windows, Linux and database assets to ensure service uptime. Managed TLS/SSL digital certificates and applied documented preventive and corrective improvements, working under Scrum with CI/CD and Kubernetes.',
      technologies: ['Linux', 'Windows Server', 'TLS/SSL', 'Kubernetes', 'CI/CD'],
      current: false,
    },
    {
      period: 'Dec 2021 — Apr 2023',
      role: 'Customer Service — Technical & Sales Support',
      company: 'E-SIGN S.A.',
      description:
        'Provided technical and sales support to customers by phone and in person, following up on their requests.',
      technologies: ['Technical Support', 'Customer Service'],
      current: false,
    },
  ];
}
