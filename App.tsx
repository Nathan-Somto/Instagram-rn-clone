import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./app/screens";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "./app/hooks/useAuth";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Os_Condensed-medium": require("./assets/fonts/OpenSans_Condensed-Medium.ttf"),
    "Os_Condensed-regular": require("./assets/fonts/OpenSans_Condensed-Regular.ttf"),
    "Os_Condensed-semi_bold": require("./assets/fonts/OpenSans_Condensed-SemiBold.ttf"),
  });
  useEffect(() => {
    async function loadFont() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    loadFont();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
