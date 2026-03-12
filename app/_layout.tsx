import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="(drawer)" options={{ title: 'App' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
