// RootNavigation.ts

import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SearchScreen: undefined;
  // add more routes here as needed
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  screen: T,
  params: RootStackParamList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen as any, params as any);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetTo(screen: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screen, params}],
      }),
    );
  }
}
