import { Component, computed, signal } from '@angular/core';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

@Component({
  imports: [],
  selector: 'app-testimonials',
  styleUrl: './testimonials.css',
  templateUrl: './testimonials.html',
})
export class Testimonials {
  // Add testimonials here
  public testimonials: Testimonial[] = [];
  public readonly activeIndex = signal(0);
  public readonly active = computed(() => this.testimonials[this.activeIndex()]);
  public next = (): void => {
    this.activeIndex.update((index) => (index + 1) % this.testimonials.length);
  };
  public previous = (): void => {
    this.activeIndex.update(
      (index) => (index - 1 + this.testimonials.length) % this.testimonials.length,
    );
  };
}
