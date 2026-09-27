import { Component } from '@angular/core';
import { AnimatedButton } from '../../components/animated-button/animated-button';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
}

@Component({
  imports: [AnimatedButton],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {
  // Add projects here, images go in /public/projects
  public projects: Project[] = [];
}
