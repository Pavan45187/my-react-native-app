import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = async () => {
      const onboarded = await AsyncStorage.getItem("onboarded");
      const loggedIn = await AsyncStorage.getItem("loggedIn");

      setIsFirstTime(onboarded === null); // first-time if not set
      setIsLoggedIn(loggedIn === "true");
    };

    checkStatus();
  }, []);

  // Prevent blank / wrong screen while loading
  if (isFirstTime === null) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isFirstTime ? (
        <Stack.Screen name="onboarding" />
      ) : !isLoggedIn ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}