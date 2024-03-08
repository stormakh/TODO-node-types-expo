import * as SecureStore from 'expo-secure-store';

export async function saveString(key : string, value : string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key:string ) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    alert('No values stored under that key.');
  }
}