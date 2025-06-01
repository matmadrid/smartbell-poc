// src/app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import Onboarding from '@/components/auth/Onboarding';
import DashboardPage from './dashboard/page';

export default function Home() {
  const router = useRouter();
  const { isOnboardingComplete, user } = useStore();

  useEffect(() => {
    // Aquí podrías verificar si el usuario está autenticado
    // Por ahora simularemos que siempre hay un usuario
    if (!user) {
      const mockUser = {
        id: '1',
        email: 'usuario@smartbell.com',
        name: 'Usuario Demo',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      useStore.getState().setUser(mockUser);
    }
  }, [user]);

  // Si el onboarding está completo, mostrar el dashboard
  if (isOnboardingComplete) {
    return <DashboardPage />;
  }

  // Si no, mostrar el onboarding
  return <Onboarding />;
}