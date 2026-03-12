import { Redirect } from 'expo-router';

export default function Index() {
  // Public homepage is the first screen. Sign in/up from there.
  return <Redirect href="/home" />;
}
