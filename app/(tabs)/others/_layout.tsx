import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      initialRouteName='index'
      screenOptions={{
        headerStyle: {
          backgroundColor: useThemeColor({ colorName: 'primary', colorBrightness: 500 })
        },
        headerTintColor: useThemeColor({ colorName: 'text' }),
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      {/* <Stack.Screen name="others" options={{}} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="people" options={{ title: 'People' }} />
      <Stack.Screen name="cases" options={{ title: 'Cases' }} />
    </Stack>
  );
}
