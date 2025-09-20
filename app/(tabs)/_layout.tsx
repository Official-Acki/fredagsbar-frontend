import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();
  
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="home" />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: true,
            tabBarIcon: ({ color }) => <MaterialIcons color={color} size={28} name="send" />,
          }}
        />
      </Tabs>
    );
  }