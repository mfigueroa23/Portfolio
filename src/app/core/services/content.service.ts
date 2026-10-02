import { afterNextRender, inject, Injectable, Injector, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, timeout } from 'rxjs';
import { API_URL } from '../config/api';
import { ContentCollection } from '../interfaces/content';

// A slow API must not stall the prerender; the section then shows its empty state.
const LOAD_TIMEOUT_MS = 5000;

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  /**
   * Returns the items of a content collection as a signal.
   *
   * The first GET runs during prerender and its response is embedded in the HTML by the
   * HTTP transfer cache, so hydration reuses it without a flash. Once rendered in the
   * browser, a second GET bypasses that cache to pick up content edited after the release.
   */
  public collection<T>(name: ContentCollection): Signal<T[]> {
    const url = `${API_URL}/content/${name}`;
    const items = signal<T[]>([]);

    this.http
      .get<T[]>(url)
      .pipe(
        timeout(LOAD_TIMEOUT_MS),
        catchError(() => of<T[]>([])),
      )
      .subscribe((value) => items.set(value));

    // afterNextRender never runs on the server, so the refetch is browser-only.
    afterNextRender(
      () => {
        this.http.get<T[]>(url, { transferCache: false }).subscribe({
          next: (fresh) => {
            // Avoid a new emission (and re-render) when the content did not change.
            if (JSON.stringify(fresh) !== JSON.stringify(items())) items.set(fresh);
          },
          // Keep the prerendered content silently if the API is unreachable.
          error: () => undefined,
        });
      },
      { injector: this.injector },
    );

    return items.asReadonly();
  }
}
