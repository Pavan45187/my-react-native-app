// app/onboarding/_layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"   // app/onboarding/index.tsx
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}