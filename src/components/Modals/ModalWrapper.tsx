import React, {useRef, forwardRef, useImperativeHandle} from 'react';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export type ModalWrapperRef = {
  open: () => void;
  close: () => void;
};

const ModalWrapperComponent = (
  props: {children?: React.ReactNode} & React.ComponentProps<typeof Modalize>,
  ref: React.Ref<ModalWrapperRef>,
) => {
  const modalizeRef = useRef<Modalize>(null);

  useImperativeHandle(ref, () => ({
    open: () => modalizeRef.current?.open(),
    close: () => modalizeRef.current?.close(),
  }));

  return (
    <Portal>
      <Modalize ref={modalizeRef} {...props}>
        {props.children}
      </Modalize>
    </Portal>
  );
};

export const ModalWrapper = forwardRef<
  ModalWrapperRef,
  {children?: React.ReactNode} & React.ComponentProps<typeof Modalize>
>(ModalWrapperComponent);
