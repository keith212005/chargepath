import {useAppTheme} from '@hooks';
import React from 'react';
import {ActivityIndicator} from 'react-native';

interface LoaderProps {
  show: boolean;
}

export const Loader = ({show}: LoaderProps) => {
  const {colors} = useAppTheme();
  return (
    <>
      {show && (
        <ActivityIndicator
          size="small"
          color={colors.text}
          style={{padding: 10}}
        />
      )}
    </>
  );
};
