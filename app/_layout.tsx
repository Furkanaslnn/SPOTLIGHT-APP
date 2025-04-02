import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitinalLayout from "@/components/InitinalLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fonstLoaded] = useFonts({
    "jetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fonstLoaded) SplashScreen.hideAsync();
  }, [fonstLoaded]);

  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#000" }}
          onLayout={onLayoutRootView}
        >
          <InitinalLayout></InitinalLayout>
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkAndConvexProvider>
  );
}
