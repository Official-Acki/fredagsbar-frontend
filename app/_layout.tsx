import React from "react";
import { useColorScheme, View } from "react-native";
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function RootLayout() {

    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

                <Stack initialRouteName="(tabs)">
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)/others" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="download" options={{ headerShown: false }} />
                    {/* <Stack.Screen name="+not-found" /> */}
                </Stack>
                <Toast />
                <StatusBar style="auto" />
        </ThemeProvider>
    );
}