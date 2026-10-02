import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../config/api';
import { ApiError, ApiMessage, ContactMessage } from '../interfaces/contact';

const GENERIC_ERROR = 'Failed to send message. Please try again later.';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  /** Resolves with the API's success text; rejects with the text to show the visitor. */
  public async send(message: ContactMessage): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<ApiMessage>(`${API_URL}/contact`, message),
      );
      return response.message;
    } catch (error) {
      throw new Error(errorText(error));
    }
  }
}

// Only the API's own `{ error }` body is shown; network failures (status 0) and
// non-JSON bodies from proxies fall back to a generic text.
function errorText(error: unknown): string {
  if (error instanceof HttpErrorResponse && error.status !== 0) {
    const body = error.error as Partial<ApiError> | null;
    if (typeof body?.error === 'string' && body.error) return body.error;
  }
  return GENERIC_ERROR;
}
