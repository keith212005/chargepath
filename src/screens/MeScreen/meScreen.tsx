import {useEffect} from '@preact-signals/safe-react/react';
import React from 'react';
import {Text} from 'react-native';

export const MeScreen = () => {
  console.log('MeScreen render');
  useEffect(() => {
    console.log('MeScreen mounted');
  }, []);

  return (
    <>
      <Text>Me</Text>
    </>
  );
};
