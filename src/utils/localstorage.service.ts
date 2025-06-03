import {MMKV} from 'react-native-mmkv';

export class LocalStorageService {
  private static storage: MMKV | null = null;
  private static fallbackStorage: Map<string, string> = new Map();
  private static initialized = false;

  private static initialize() {
    if (!this.initialized) {
      try {
        this.storage = new MMKV();
      } catch (error) {
        console.warn(
          'MMKV not available (likely due to Chrome debugging), using fallback storage',
        );
        this.storage = null;
      }
      this.initialized = true;
    }
  }

  public static getFromStorage(key: string): string | null {
    this.initialize();

    if (this.storage) {
      const value = this.storage.getString(key);
      return value ?? null;
    } else {
      // Fallback for debugging
      return this.fallbackStorage.get(key) ?? null;
    }
  }

  public static setToStorage(key: string, value: string): void {
    this.initialize();

    if (this.storage) {
      this.storage.set(key, value);
    } else {
      // Fallback for debugging
      this.fallbackStorage.set(key, value);
    }
  }

  public static removeFromStorage(key: string): void {
    this.initialize();

    if (this.storage) {
      this.storage.delete(key);
    } else {
      // Fallback for debugging
      this.fallbackStorage.delete(key);
    }
  }

  public static clearStorage(): void {
    this.initialize();

    if (this.storage) {
      this.storage.clearAll();
    } else {
      // Fallback for debugging
      this.fallbackStorage.clear();
    }
  }
}
