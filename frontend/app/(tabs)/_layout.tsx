import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { Home, MessageCircle, User, Handshake } from 'lucide-react-native';
// import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import LightDark from '@/components/customComponents/lightDark';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Tabs are strange in that they do not accept nativewind
  const tabColors = colorScheme === 'light' 
  ? {
      active: '#2563eb',      
      inactive: '#6b7280',    
      background: '#ffffff',  
    }
  : {
      active: '#2563eb',      
      inactive: '#9ca3af',    
      background: '#1e2939',
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
        tabBarLabelStyle: {
          fontFamily: 'Inter_600SemiBold', // Add this for tab labels!
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: tabColors.background
        },
        headerTintColor: tabColors.inactive,
        headerTitle: 'PasaBuy',
        headerTitleAlign: 'center',
        // may need a stylized Name here
        headerTitleStyle: {
          fontFamily: 'Inter_700Bold'
        },
        headerRight: () => <LightDark/>,
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