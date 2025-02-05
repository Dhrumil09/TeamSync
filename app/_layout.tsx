// app/_layout.js
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store'; // Adjust the path
import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: 'Login',
              headerShown: true,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerTitle: 'Sign Up',
              headerShown: true,
              headerBackVisible: false,
            }}
          />

        </Stack>
      </PersistGate>
    </Provider>
  );
}
