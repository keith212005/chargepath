import {useSignal} from '@preact/signals-react';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'counter_value';

export const counter = useSignal(0);

export const increment = () => {
  counter.value++;
};

export const resetCounter = () => {
  counter.value = 0;
};

// Generic helper to persist any signal
export const persistSignal = <T>(
  signalRef: {value: T; subscribe: (cb: (value: T) => void) => () => void},
  key: string,
  serialize: (value: T) => string = JSON.stringify,
  deserialize: (raw: string) => T = JSON.parse,
) => {
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem(key);
      if (saved !== null) {
        signalRef.value = deserialize(saved);
      }
    };

    load();

    const unsubscribe = signalRef.subscribe(value => {
      AsyncStorage.setItem(key, serialize(value));
    });

    return () => unsubscribe();
  }, []);
};

// Hydrate and persist the counter value
export const usePersistedCounter = () => {
  persistSignal(
    counter,
    STORAGE_KEY,
    v => v.toString(),
    raw => parseInt(raw, 10),
  );
};
