import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export function storeData(key: string, value: string) {
    if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return Promise.resolve();
    }
    return SecureStore.setItemAsync(key, value);
}

export function getData(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
        return Promise.resolve(localStorage.getItem(key));
    }
    return SecureStore.getItemAsync(key);
}

export function deleteData(key: string) {
    if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return Promise.resolve();
    }
    return SecureStore.deleteItemAsync(key);
}