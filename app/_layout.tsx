import React from "react";
import { useColorScheme, View } from "react-native";
import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {

    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/* <Stack.Screen name="+not-found" /> */}
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}