import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="pharmacy/index" options={{ title: 'Pharmacy' }} />
      <Stack.Screen name="pharmacy/branch/[id]" options={{ title: 'Branch Details' }} />
      <Stack.Screen name="laboratory/index" options={{ title: 'Laboratory' }} />
    </Stack>
  );
}
