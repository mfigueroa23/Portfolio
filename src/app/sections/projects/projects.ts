import { Component, inject } from '@angular/core';
import { AnimatedButton } from '../../components/animated-button/animated-button';
import { Project } from '../../core/interfaces/content';
import { ContentService } from '../../core/services/content.service';

@Component({
  imports: [AnimatedButton],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects {
  public readonly projects = inject(ContentService).collection<Project>('projects');
}
