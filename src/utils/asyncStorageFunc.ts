import AsyncStorage from '@react-native-community/async-storage';
import {MovieDetail} from '../types';

export const setStorage = async (bookmarkItem: MovieDetail) => {
  await AsyncStorage.setItem(
    `${bookmarkItem.id}`,
    JSON.stringify(bookmarkItem),
  );
};

export const loadKeysInStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();

  return keys;
};

export const getStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key).then(res =>
    typeof res === 'string' ? JSON.parse(res) : null,
  );
  return value;
};

export const removeItemInStorage = async (bookmarkItem: MovieDetail) => {
  await AsyncStorage.removeItem(`${bookmarkItem.id}`);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
