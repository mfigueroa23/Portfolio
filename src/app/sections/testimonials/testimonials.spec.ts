import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentService } from '../../core/services/content.service';
import { Testimonial } from '../../core/interfaces/content';
import { Testimonials } from './testimonials';

describe('Testimonials', () => {
  const items: Testimonial[] = [
    { id: 1, position: 0, quote: 'First quote', author: 'Ada', role: 'CTO', avatar: '/a.webp' },
    { id: 2, position: 1, quote: 'Second quote', author: 'Linus', role: 'Dev', avatar: '/l.webp' },
  ];
  let collection: ReturnType<typeof vi.fn>;

  const render = async (data: Testimonial[]): Promise<ComponentFixture<Testimonials>> => {
    collection = vi.fn(() => signal(data));
    await TestBed.configureTestingModule({
      imports: [Testimonials],
      providers: [{ provide: ContentService, useValue: { collection } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(Testimonials);
    await fixture.whenStable();
    return fixture;
  };

  it('renders the first testimonial from the API', async () => {
    const fixture = await render(items);
    const element: HTMLElement = fixture.nativeElement;

    expect(collection).toHaveBeenCalledWith('testimonials');
    expect(element.querySelector('blockquote')?.textContent).toContain('First quote');
    expect(element.textContent).toContain('Ada');
    expect(element.querySelectorAll('[aria-label^="Show testimonial"]').length).toBe(2);
    expect(element.textContent).not.toContain('Testimonials coming soon');
  });

  it('navigates between testimonials and wraps around', async () => {
    const fixture = await render(items);
    const element: HTMLElement = fixture.nativeElement;
    const click = async (label: string): Promise<void> => {
      element.querySelector<HTMLButtonElement>(`[aria-label="${label}"]`)!.click();
      await fixture.whenStable();
    };

    await click('Next testimonial');
    expect(element.querySelector('blockquote')?.textContent).toContain('Second quote');
    await click('Next testimonial');
    expect(element.querySelector('blockquote')?.textContent).toContain('First quote');
    await click('Previous testimonial');
    expect(element.querySelector('blockquote')?.textContent).toContain('Second quote');
  });

  it('shows the empty state when there are no testimonials', async () => {
    const fixture = await render([]);
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Testimonials coming soon');
    expect(element.querySelector('blockquote')).toBeNull();
  });
});
