
//app/(tab)/layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';


// Helper function to render a tab bar icon


export default function TabLayout() {
  // Define primary colors used throughout the tabs
  const tintColor = '#4CD9A3'; // Your teal/green brand color
  const inactiveColor = '#748c94';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false, // Hide the header by default for screens inside the tabs
        tabBarStyle: {
          height: 60, // Give the tab bar some height for spacing
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      }}>
      
      
      {/* ⚠️ IMPORTANT: Hide the auth and onboarding routes from the tab bar */}
      <Tabs.Screen
        name="auth"
        options={{
          href: null, // This hides the 'auth' route from the tab bar
        }}
      />
      <Tabs.Screen
        name="onboardingg"
        options={{
          headerShown: false,
          // This hides the 'onboarding' route from the tab bar
        }}
      />
    </Tabs>
  );
}
