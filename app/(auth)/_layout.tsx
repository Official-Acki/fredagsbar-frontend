import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme, Platform } from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();
  
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary[700],
          headerShown: false,
        }}>
        <Tabs.Screen
          name="login"
          options={{
            title: 'Login',
            tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="home" />,
          }}
        />
        <Tabs.Screen
          name="signup"
          options={{
            title: 'Sign Up',
            headerShown: true,
            tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="send" />,
          }}
        />
        <Tabs.Screen
            name="download"
            options={{
                title: 'Download',
                href: Platform.OS == 'web' ? '/download' : null,
                headerShown: true,
                tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="download" />
            }}
        />
      </Tabs>
    );
  }