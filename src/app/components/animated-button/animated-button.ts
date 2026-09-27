import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-animated-button',
  styleUrl: './animated-button.css',
  templateUrl: './animated-button.html',
})
export class AnimatedButton {
  public readonly href = input<string>('');
  public readonly download = input<string>('');
  protected onClick(): void {
    if (!this.href()) return;
    window.open(this.href(), '_blank', 'noopener');
  }
}
