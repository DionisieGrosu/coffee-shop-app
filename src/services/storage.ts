import EncryptedStorage from 'react-native-encrypted-storage';

export const setItem = async (
  label: string,
  value: string | object,
): Promise<string | object> => {
  try {
    if (typeof value === 'string') {
      await EncryptedStorage.setItem(label, value);
      return new Promise((resolve, reject) => {
        resolve(value);
      });
    } else {
      await EncryptedStorage.setItem(label, JSON.stringify(value));
      return new Promise((resolve, reject) => {
        resolve(value);
      });
    }
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const getItem = async (label: string): Promise<string> => {
  try {
    let value = (await EncryptedStorage.getItem(label)) ?? '';

    return new Promise((resolve, reject) => {
      resolve(value);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

export const removeItem = async (label: string): Promise<boolean | string> => {
  try {
    await EncryptedStorage.removeItem(label);

    return new Promise((resolve, reject) => {
      reject(true);
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};
