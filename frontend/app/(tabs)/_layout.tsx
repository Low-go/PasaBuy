import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Home, MessageCircle, User, Handshake } from 'lucide-react-native';
// import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Tabs are strange in that they do not accept nativewind
  const tabColors = colorScheme === 'light' 
  ? {
      active: '#D1A85A',      
      inactive: '#9AA4B2',    
      background: '#22344A',  
    }
  : {
      active: '#C79A4A',      
      inactive: '#FFFFFF',    
      background: '#121A26',  
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
        name="offers"
        options={{
          title: 'Offers',
          tabBarIcon: ({ color }) => <Handshake size={28} color={color} strokeWidth={2}/>,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <MessageCircle size={28} color={color} strokeWidth={2}/>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={28} color={color} strokeWidth={2}/>,
        }}
      />
    </Tabs>
  );
}



