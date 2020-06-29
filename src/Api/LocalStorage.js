export const getKey = (key) => {
  let data = localStorage.getItem(key);
  return data;
}

export const setKey = (key, data) => {
  data = localStorage.setItem(key, data);
  return data;
}

export const getLocalStorage = (key) => {
  let data = getKey(key);
  if (data === null || !data || data === '') return '';
  return JSON.parse(data);
}

export const setLocalStorage = (key, data) => {
  return setKey(key, JSON.stringify(data));
}
