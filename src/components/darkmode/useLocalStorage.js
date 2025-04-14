import {useEffect, useState} from 'react';

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(currentValue));
    }
    catch (error) {
      console.error('Render failed', error);
      currentValue = defaultValue;
    }
    return currentValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue];
};