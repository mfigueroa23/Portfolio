import { Component, inject } from '@angular/core';
import { Experience as ExperienceItem } from '../../core/interfaces/content';
import { ContentService } from '../../core/services/content.service';

@Component({
  imports: [],
  selector: 'app-experience',
  styleUrl: './experience.css',
  templateUrl: './experience.html',
})
export class Experience {
  public readonly experiences = inject(ContentService).collection<ExperienceItem>('experiences');
}
