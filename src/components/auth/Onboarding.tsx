'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Bell, MapPin, ChevronRight, Check } from 'lucide-react';
import { useStore } from '@/store';
import AddCattleForm from '@/components/cattle/AddCattleForm';

type OnboardingStep = 'welcome' | 'ranch' | 'firstCattle' | 'complete';

interface RanchFormData {
  name: string;
  location: string;
  size?: number;
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  // Eliminamos setUser ya que no se usa en este componente
  const { setCurrentRanch, setIsOnboardingComplete } = useStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RanchFormData>();

  const steps = [
    { id: 'welcome', title: 'Bienvenida', progress: 0 },
    { id: 'ranch', title: 'Tu Rancho', progress: 33 },
    { id: 'firstCattle', title: 'Primer Animal', progress: 66 },
    { id: 'complete', title: 'Completado', progress: 100 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progressValue = steps[currentStepIndex]?.progress || 0;

  const handleRanchSubmit = (data: RanchFormData) => {
    const newRanch = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      userId: 'user1', // Temporal
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setCurrentRanch(newRanch);
    setCurrentStep('firstCattle');
  };

  const handleCattleSuccess = () => {
    setCurrentStep('complete');
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
    // Aquí redirigirías al dashboard
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div
                key={step.id"
                className={`text-xs ${
                  index <= currentStepIndex ? 'text-blue-600 font-medium' : 'text-gray-400'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Step */}
        {currentStep === 'welcome' && (
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">¡Bienvenido a Smartbell!</CardTitle>
              <CardDescription className="text-lg mt-2">
                La plataforma inteligente para administrar tu rancho lechero
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Gestión simplificada</p>
                    <p className="text-sm text-gray-600">
                      Administra tu ganado y producción en un solo lugar
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Aumenta tu rentabilidad</p>
                    <p className="text-sm text-gray-600">
                      Optimiza tu producción con datos en tiempo real
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Comunidad de ganaderos</p>
                    <p className="text-sm text-gray-600">
                      Conecta con otros productores y comparte experiencias
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setCurrentStep('ranch')} 
                className="w-full"
                size="lg"
              >
                Comenzar
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Ranch Step */}
        {currentStep === 'ranch' && (
          <Card>
            <CardHeader>
              <CardTitle>Información de tu Rancho</CardTitle>
              <CardDescription>
                Cuéntanos sobre tu rancho para personalizar tu experiencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleRanchSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nombre del Rancho <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ej: Rancho Los Alamos"
                    {...register('name', { required: 'El nombre es requerido' })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Ubicación <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Ej: Jalisco, México"
                      className="pl-10"
                      {...register('location', { required: 'La ubicación es requerida' })}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Tamaño (hectáreas)</Label>
                  <Input
                    id="size"
                    type="number"
                    placeholder="Opcional"
                    {...register('size', { valueAsNumber: true })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('welcome')}
                  >
                    Atrás
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continuar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* First Cattle Step */}
        {currentStep === 'firstCattle' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Registra tu primer animal</h2>
              <p className="text-gray-600 mt-2">
                Puedes agregar más animales después desde el dashboard
              </p>
            </div>
            <AddCattleForm onSuccess={handleCattleSuccess} />
            <Button
              variant="ghost"
              onClick={() => setCurrentStep('complete')}
              className="w-full"
            >
              Omitir por ahora
            </Button>
          </div>
        )}

        {/* Complete Step */}
        {currentStep === 'complete' && (
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">¡Felicidades!</CardTitle>
              <CardDescription className="text-lg mt-2">
                Tu rancho está listo para comenzar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  Oferta especial de lanzamiento
                </h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">
                  50% de descuento
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  en tu primer año de membresía
                </p>
                <div className="space-y-2">
                  <Button size="lg" className="w-full">
                    $250 MXN/mes
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    $2,500 MXN/año (Ahorra $500)
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={completeOnboarding}
                className="w-full"
              >
                Continuar con plan gratuito
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}