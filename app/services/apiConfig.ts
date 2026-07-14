import Constants from 'expo-constants';

const DEFAULT_API_URL = 'http://192.168.127.36:8888';

const isPrivateIpv4 = (hostname: string) => {
  const octets = hostname.split('.').map(Number);
  if (octets.length !== 4 || octets.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }
  return octets[0] === 10
    || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    || (octets[0] === 192 && octets[1] === 168)
    || octets[0] === 127;
};

export const validateApiBaseUrl = (value: string) => {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  const localHostname = hostname === 'localhost' || hostname.endsWith('.local') || !hostname.includes('.');

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Le protocole de l’API doit être HTTP ou HTTPS.');
  }
  if (url.username || url.password || url.search || url.hash) {
    throw new Error('L’URL de l’API ne doit contenir ni identifiants ni paramètres.');
  }
  if (url.protocol === 'http:' && !isPrivateIpv4(hostname) && !localHostname) {
    throw new Error('Une API HTTP doit rester sur le réseau local privé.');
  }

  return url.origin;
};

export const resolveApiBaseUrl = () => {
  const configured = process.env.EXPO_PUBLIC_API_URL
    || (Constants.expoConfig?.extra?.apiUrl as string | undefined)
    || DEFAULT_API_URL;
  return validateApiBaseUrl(configured);
};
