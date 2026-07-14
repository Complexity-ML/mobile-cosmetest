import { validateApiBaseUrl } from '../apiConfig';

describe('validateApiBaseUrl', () => {
  it('accepte HTTP uniquement sur un réseau privé local', () => {
    expect(validateApiBaseUrl('http://192.168.127.36:8888/')).toBe('http://192.168.127.36:8888');
    expect(validateApiBaseUrl('http://cosmet-srv:8888')).toBe('http://cosmet-srv:8888');
  });

  it('refuse une API HTTP publique', () => {
    expect(() => validateApiBaseUrl('http://example.com:8888')).toThrow('réseau local privé');
  });

  it('accepte HTTPS et refuse les identifiants intégrés', () => {
    expect(validateApiBaseUrl('https://api.example.com')).toBe('https://api.example.com');
    expect(() => validateApiBaseUrl('http://user:secret@192.168.1.10:8888')).toThrow('identifiants');
  });
});
