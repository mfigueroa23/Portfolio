import { Component, inject } from '@angular/core';
import { Highlight } from '../../core/interfaces/content';
import { ContentService } from '../../core/services/content.service';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About {
  public readonly highlights = inject(ContentService).collection<Highlight>('highlights');
}
