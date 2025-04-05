import React from 'react';
import {Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@store';
import {increment} from '@slice';
import {Button} from '@rneui/themed';

export const TripsScreen = () => {
  const count = useSelector((state: RootState) => {
    console.log(state);

    return state.counter.value;
  });
  const dispatch = useDispatch();
  return (
    <>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
    </>
  );
};
