import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Home, Bell, User, Settings } from 'lucide-react-native';
// import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabColors = colorScheme === 'dark' 
  ? {
      active: '#D1A85A',      // Your dark mode accent
      inactive: '#9AA4B2',    // Your dark mode secondary text
      background: '#22344A',  // Your dark mode bg
    }
  : {
      active: '#C79A4A',      // Your light mode gold
      inactive: '#B9A48C',    // Your light mode neutral
      background: '#121A26',  // Your light mode bg
    };

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: tabColors.active,
        tabBarInactiveTintColor: tabColors.inactive,
        tabBarStyle: {
          backgroundColor: tabColors.background,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={28} color={color} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Bell size={28} color={color} strokeWidth={2}/>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={28} color={color} strokeWidth={2}/>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={28} color={color} strokeWidth={2}/>,
        }}
      />
    </Tabs>
  );
}



