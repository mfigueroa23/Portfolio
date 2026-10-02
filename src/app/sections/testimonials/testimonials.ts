import { Component, computed, inject, signal } from '@angular/core';
import { Testimonial } from '../../core/interfaces/content';
import { ContentService } from '../../core/services/content.service';

@Component({
  imports: [],
  selector: 'app-testimonials',
  styleUrl: './testimonials.css',
  templateUrl: './testimonials.html',
})
export class Testimonials {
  public readonly testimonials = inject(ContentService).collection<Testimonial>('testimonials');
  public readonly activeIndex = signal(0);
  public readonly active = computed(() => this.testimonials()[this.activeIndex()]);
  public next = (): void => {
    this.activeIndex.update((index) => (index + 1) % this.testimonials().length);
  };
  public previous = (): void => {
    this.activeIndex.update(
      (index) => (index - 1 + this.testimonials().length) % this.testimonials().length,
    );
  };
}
