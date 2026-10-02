export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ApiMessage {
  message: string;
}

export interface ApiError {
  error: string;
  fields?: Record<string, string[]>;
}
