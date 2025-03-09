import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SignedIn, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";

export default function InitinalLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  const router = useRouter();

  useEffect(() => {
    if (isLoaded) return;

    const inAuthPage = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthPage) router.replace("/(auth)/login");
    else if (isSignedIn && inAuthPage) router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}
