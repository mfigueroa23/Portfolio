import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  public readonly currentYear = new Date().getFullYear();
  public footerLinks: { href: string; label: string }[] = [
    { href: '/#about', label: 'About' },
    { href: '/#projects', label: 'Projects' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#contact', label: 'Contact' },
  ];
  public socialLinks: { icon: string; href: string; label: string }[] = [
    { icon: 'fa-brands fa-github', href: 'https://github.com/mfigueroa23', label: 'GitHub' },
    {
      icon: 'fa-brands fa-linkedin',
      href: 'https://www.linkedin.com/in/mfigueroa23',
      label: 'LinkedIn',
    },
    { icon: 'fa-brands fa-x-twitter', href: 'https://x.com/marcoo_f23', label: 'X' },
  ];
}
