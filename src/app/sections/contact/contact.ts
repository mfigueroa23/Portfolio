import { Component, inject, signal } from '@angular/core';
import { Button } from '../../components/button/button';
import { ContactService } from '../../core/services/contact.service';

const email = 'marco@figueroa-sanchez.com';

@Component({
  imports: [Button],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  private readonly contactService = inject(ContactService);
  public contactInfo: { icon: string; label: string; value: string; href: string }[] = [
    { icon: 'fa-solid fa-envelope', label: 'Email', value: email, href: `mailto:${email}` },
    {
      icon: 'fa-solid fa-location-dot',
      label: 'Location',
      value: 'Santiago, Chile',
      href: '/#contact',
    },
  ];
  public readonly name = signal('');
  public readonly email = signal('');
  public readonly message = signal('');
  // Honeypot: real visitors never see this field, so any value marks the submission as a bot.
  public readonly website = signal('');
  public readonly isLoading = signal(false);
  public readonly status = signal<{ type: 'success' | 'error'; message: string } | null>(null);
  public async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    this.isLoading.set(true);
    this.status.set(null);
    try {
      const result = await this.contactService.send({
        name: this.name(),
        email: this.email(),
        message: this.message(),
        website: this.website(),
      });
      this.status.set({ type: 'success', message: result });
      this.name.set('');
      this.email.set('');
      this.message.set('');
    } catch (error) {
      this.status.set({
        type: 'error',
        message:
          (error instanceof Error && error.message) ||
          'Failed to send message. Please try again later.',
      });
    } finally {
      this.isLoading.set(false);
    }
  }
}
