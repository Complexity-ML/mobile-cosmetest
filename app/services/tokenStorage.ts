import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// We prefer SecureStore when available (native mobile). On web, fallback to AsyncStorage.
let SecureStore: typeof import('expo-secure-store') | null = null;
try {
  // Lazy require to avoid crashes if the module isn't installed on web
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SecureStore = require('expo-secure-store');
} catch {
  SecureStore = null;
}

const ACCESS_TOKEN_KEY = 'authToken';

let accessTokenMemory: string | null = null;

const canUseSecureStore = () => Platform.OS !== 'web' && SecureStore && 'setItemAsync' in SecureStore;

const assertNativeSecureStore = () => {
  if (Platform.OS !== 'web' && !canUseSecureStore()) {
    throw new Error('Le stockage sécurisé natif est indisponible.');
  }
};

export async function setAccessToken(token: string): Promise<void> {
  assertNativeSecureStore();
  accessTokenMemory = token;
  if (canUseSecureStore()) {
    await (SecureStore as any).setItemAsync(ACCESS_TOKEN_KEY, token, {
      keychainService: ACCESS_TOKEN_KEY,
      keychainAccessible: (SecureStore as any).WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } else {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

export async function getAccessToken(): Promise<string | null> {
  assertNativeSecureStore();
  if (accessTokenMemory) return accessTokenMemory;
  let token: string | null;
  if (canUseSecureStore()) {
    token = await (SecureStore as any).getItemAsync(ACCESS_TOKEN_KEY);
  } else {
    token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  }
  accessTokenMemory = token;
  return token;
}

export function getAccessTokenSync(): string | null {
  // Synchronous accessor for interceptors, backed by in-memory cache
  return accessTokenMemory;
}

export async function clearAccessToken(): Promise<void> {
  assertNativeSecureStore();
  accessTokenMemory = null;
  if (canUseSecureStore()) {
    await (SecureStore as any).deleteItemAsync(ACCESS_TOKEN_KEY, {
      keychainService: ACCESS_TOKEN_KEY,
    });
  } else {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export default {
  setAccessToken,
  getAccessToken,
  getAccessTokenSync,
  clearAccessToken,
};

