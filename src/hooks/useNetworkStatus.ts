import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {setNetworkStatus} from '@slice';
import {useAppDispatch} from '@store';

export const useNetworkStatus = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isInternetReachable ?? false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};
