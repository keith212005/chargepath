import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {Text} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export type MapInformationRef = {
  open: () => void;
};

const MapInformationComponent = (
  _props: {},
  ref: React.Ref<MapInformationRef>,
) => {
  const modalizeRef = useRef<Modalize>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      console.log('open called>>>>>>');
      modalizeRef.current?.open();
    },
  }));

  return (
    <Portal>
      <Modalize ref={modalizeRef}>
        <Text>...your content</Text>
      </Modalize>
    </Portal>
  );
};

export const MapInformation = forwardRef<MapInformationRef, {}>(
  MapInformationComponent,
);
