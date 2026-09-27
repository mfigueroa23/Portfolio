import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  public highlights: { icon: string; title: string; description: string }[] = [
    {
      icon: 'fa-solid fa-code',
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code that is easy to read and evolve.',
    },
    {
      icon: 'fa-solid fa-server',
      title: 'Reliable Systems',
      description: 'Operating critical Linux and Windows services with a focus on uptime.',
    },
    {
      icon: 'fa-solid fa-rocket',
      title: 'DevOps',
      description: 'Automating builds and deployments with CI/CD, Docker and Kubernetes.',
    },
    {
      icon: 'fa-solid fa-users',
      title: 'Collaboration',
      description: 'Working with agile teams under Scrum to ship value iteratively.',
    },
  ];
}
