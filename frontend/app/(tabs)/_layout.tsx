import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Home, MessageCircle, User, Handshake } from 'lucide-react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import LightDark from '@/components/customComponents/lightDark';

// Import your screen components
import HomeScreen from './index';
import OffersScreen from './offers';
import NotificationsScreen from './notifications';
import ProfileScreen from './profile';

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // I might not need this since I am not using the previous default embedded and made tabs but a custom one
  // TODO check if I can use our universal color scheme in className
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
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: tabColors.active,
        tabBarInactiveTintColor: tabColors.inactive,
        tabBarStyle: {
          backgroundColor: tabColors.background,
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

//TODO Reamke header with the button and impport it into the respective tabs.