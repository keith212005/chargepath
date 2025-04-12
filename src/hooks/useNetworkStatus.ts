import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {setNetworkStatus} from '@slice';
import {useAppDispatch} from '@store';

/**
 * A hook that listens for network status changes and updates the global
 * network status in the Redux store. The network status is set to true
 * if the device is connected to the internet, and false otherwise.
 *
 * @returns {void}
 */
export const useNetworkStatus = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isInternetReachable ?? false));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
