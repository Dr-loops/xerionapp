import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="pharmacy" options={{ title: 'Pharmacy' }} />
      <Stack.Screen name="laboratory" options={{ title: 'Laboratory' }} />
    </Stack>
  );
}
