// app/_layout.js
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store'; // Adjust the path
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function RootLayout() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
    
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: 'Login',
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerTitle: 'Sign Up',
              headerShown: false,
              headerBackVisible: false,
            }}
          />

        </Stack>
      </PersistGate>
      </SafeAreaProvider>
    </Provider>
  );
}
