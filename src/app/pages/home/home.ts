import { Component } from '@angular/core';
import { About } from '../../sections/about/about';
import { Projects } from '../../sections/projects/projects';
import { Experience } from '../../sections/experience/experience';
import { Contact } from '../../sections/contact/contact';
import { Hero } from '../../sections/hero/hero';
import { Testimonials } from '../../sections/testimonials/testimonials';

@Component({
  imports: [Hero, About, Projects, Experience, Testimonials, Contact],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
