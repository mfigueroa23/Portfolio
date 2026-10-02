import { API_URL, resolveApiUrl } from './api';

describe('resolveApiUrl', () => {
  it('falls back to the production API when the value is not set', () => {
    expect(resolveApiUrl(undefined)).toBe('https://api.figueroa-sanchez.com');
  });

  it('falls back to the production API when the value is empty or blank', () => {
    expect(resolveApiUrl('')).toBe('https://api.figueroa-sanchez.com');
    expect(resolveApiUrl('   ')).toBe('https://api.figueroa-sanchez.com');
  });

  it('uses the given URL without surrounding spaces or trailing slashes', () => {
    expect(resolveApiUrl('http://localhost:3000/')).toBe('http://localhost:3000');
    expect(resolveApiUrl(' http://localhost:3000// ')).toBe('http://localhost:3000');
    expect(resolveApiUrl('https://api.example.com')).toBe('https://api.example.com');
  });
});

describe('API_URL', () => {
  it('uses the production API when the build defines no NG_API_URL', () => {
    expect(API_URL).toBe('https://api.figueroa-sanchez.com');
  });
});
