import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const data = await AsyncStorage.getItem('user_profile');
      setIsLoggedIn(!!data);
    } catch (e) {
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn === null) {
    return null; // Loading state
  }

  // If logged in, go to the drawer dashboard. Otherwise, go to public home.
  return <Redirect href={isLoggedIn ? "/(drawer)" : "/home"} />;
}
