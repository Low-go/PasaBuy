import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import "../global.css"
import { PortalHost } from '@rn-primitives/portal';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SessionProvider, useSession } from '@/authContext';
import { SplashScreenController } from '@/splash';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { vars } from 'nativewind';
import appColors from 'styles/colors';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';


export const unstable_settings = {
  anchor: '(tabs)',
};

// Is this really how phone applications work? You need them all in root
// This seems horrible, there has to be a better way
// 

const lightTheme = vars(appColors.light);
const darkTheme = vars(appColors.dark);

export default function RootLayout() {
  const  colorScheme  = useColorScheme();

  // Fonts become global through use fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Provider store={store}>
      <View style={[{ flex: 1 }, theme]}>
        <SessionProvider>
          <SplashScreenController/>
          <RootNavigator/>
        </SessionProvider>
        <StatusBar style="auto" />
        <PortalHost/>
      </View>
    </Provider>
  );
}

function RootNavigator(){
  const {session} = useSession();
  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  )
}