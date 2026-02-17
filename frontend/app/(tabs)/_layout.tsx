import React, { useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home, MessageCircle, User, Handshake } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';

// Import screen components
import HomeScreen from './index';
import OffersScreen from './offers';
import NotificationsScreen from './notifications';
import ProfileScreen from './profile';
const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Tabs need injected colors and cannot use (as far as I know) classNames/tailwind
  const tabColors = colorScheme === 'light' 
    ? {
        active: '#2563eb',      
        inactive: '#111827',    
        background: '#ffffff',  
      }
    : {
        active: '#2563eb',      
        inactive: '#ffffff',    
        background: '#1e2939',
      };

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: tabColors.active,
        tabBarInactiveTintColor: tabColors.inactive,
        tabBarStyle: {
          backgroundColor: tabColors.background,
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'light' ? '#e5e7eb' : '#374151',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_600SemiBold',
          fontSize: 12,
        },
        tabBarIndicatorStyle: {
          backgroundColor: tabColors.active,
        },
        swipeEnabled: true,
        lazy: false,
      }}
      // Haptics when clicking anotehr tab or swiping the screen
      screenListeners={{
        tabPress: (e) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
        swipeStart: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Home size={28} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen 
        name="Offers" 
        component={OffersScreen}
        options={{
          tabBarIcon: ({ color }) => <Handshake size={28} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen 
        name="Chats" 
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <MessageCircle size={28} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User size={28} color={color} strokeWidth={2} />,
        }}
      />
    </Tab.Navigator>
  );
}

