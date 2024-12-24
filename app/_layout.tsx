import { Stack, useNavigationContainerRef } from 'expo-router';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import '../global.css';
import { useFonts } from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';
import { Provider } from 'react-redux';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { getLocales } from 'expo-localization';
import { i18n, Language } from '@/localization';
import * as Sentry from '@sentry/react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay:
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient, // Only in native builds, not in Expo Go.
});

Sentry.init({
  dsn: 'https://998af0d4db7c4bdcdd0e649b8f072e40@o4508520604827648.ingest.us.sentry.io/4508520607252480',
  tracesSampleRate: 1.0,
  integrations: [navigationIntegration],
  enableNativeFramesTracking:
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient, // Only in native builds, not in Expo Go.
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});
// Define location and language
i18n.locale = getLocales()[0].languageCode ?? 'vn';
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

function RootLayout() {
  const [loaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const ref = useNavigationContainerRef();
  React.useEffect(() => {
    if (ref) {
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GluestackUIProvider mode="light">
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </GluestackUIProvider>
      </PersistGate>
    </Provider>
  );
}

export default Sentry.wrap(RootLayout);
