import AsyncStorage from '@react-native-community/async-storage';
import {MovieDetail} from '../types';

export const setStorage = async (bookmarkItem: MovieDetail) => {
  await AsyncStorage.setItem(
    `${bookmarkItem.title}`,
    JSON.stringify(bookmarkItem),
  );
};

export const loadStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  return keys.map(async key => {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  });
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
