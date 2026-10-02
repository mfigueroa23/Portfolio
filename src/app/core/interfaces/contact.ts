export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Honeypot field; the API silently discards the message when it is not empty. */
  website?: string;
}

export interface ApiMessage {
  message: string;
}

export interface ApiError {
  error: string;
  fields?: Record<string, string[]>;
}
