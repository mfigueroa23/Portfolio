import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL } from '../config/api';
import { Technology } from '../interfaces/content';
import { ContentService } from './content.service';

describe('ContentService', () => {
  const url = `${API_URL}/content/technologies`;
  const initial: Technology[] = [
    { id: 1, position: 0, name: 'Angular' },
    { id: 2, position: 1, name: 'NestJS' },
  ];
  let service: ContentService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContentService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    vi.useRealTimers();
    http.verify();
  });

  // The initial load is the request that is not the browser refetch.
  const initialRequest = () =>
    http.expectOne((req) => req.url === url && req.transferCache !== false);
  const refetchRequest = () =>
    http.expectOne((req) => req.url === url && req.transferCache === false);

  describe('initial load', () => {
    it('starts empty and fills the signal with the API items', () => {
      const items = service.collection<Technology>('technologies');
      expect(items()).toEqual([]);
      const req = initialRequest();
      expect(req.request.method).toBe('GET');
      req.flush(initial);
      expect(items()).toEqual(initial);
    });

    it('falls back to an empty list when the API fails', () => {
      const items = service.collection<Technology>('technologies');
      initialRequest().flush(
        { error: 'Internal server error.' },
        { status: 500, statusText: 'Error' },
      );
      expect(items()).toEqual([]);
    });

    it('falls back to an empty list when the API does not answer within 5 seconds', () => {
      vi.useFakeTimers();
      const items = service.collection<Technology>('technologies');
      const req = initialRequest();
      vi.advanceTimersByTime(5000);
      expect(req.cancelled).toBe(true);
      expect(items()).toEqual([]);
      // Advancing the clock also lets the zoneless scheduler render, which starts the refetch.
      http.match((r) => r.transferCache === false).forEach((r) => r.flush([]));
    });
  });

  describe('browser refetch', () => {
    it('requests the content again after the first render, skipping the transfer cache', () => {
      service.collection<Technology>('technologies');
      initialRequest().flush(initial);
      TestBed.tick();
      refetchRequest().flush(initial);
    });

    it('replaces the items when the API returns different content', () => {
      const items = service.collection<Technology>('technologies');
      initialRequest().flush(initial);
      TestBed.tick();
      const updated = [...initial, { id: 3, position: 2, name: 'Docker' }];
      refetchRequest().flush(updated);
      expect(items()).toEqual(updated);
    });

    it('keeps the same value when the API returns the same content', () => {
      const items = service.collection<Technology>('technologies');
      initialRequest().flush(initial);
      const before = items();
      TestBed.tick();
      refetchRequest().flush(structuredClone(initial));
      expect(items()).toBe(before);
    });

    it('keeps the previous items when the refetch fails', () => {
      const items = service.collection<Technology>('technologies');
      initialRequest().flush(initial);
      TestBed.tick();
      refetchRequest().error(new ProgressEvent('error'), { status: 0 });
      expect(items()).toEqual(initial);
    });
  });
});
