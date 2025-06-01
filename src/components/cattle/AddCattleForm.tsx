// src/components/cattle/AddCattleForm.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Check, X } from 'lucide-react';
import { useStore } from '@/store';
import { CreateCattleDTO } from '@/types';
import { toast } from '@/components/ui/use-toast';

const cattleSchema = z.object({
  internalId: z.string().min(1, 'El ID es requerido'),
  breed: z.string().min(1, 'La raza es requerida'),
  gender: z.enum(['MALE', 'FEMALE']),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  weight: z.number().optional(),
  crossBreed: z.string().optional(),
  purityLevel: z.string().optional(),
  developmentStage: z.string().optional(),
});

const breeds = [
  'Holstein',
  'Jersey',
  'Pardo Suizo',
  'Simmental',
  'Angus',
  'Brahman',
  'Charolais',
  'Hereford',
];

const developmentStages = [
  { value: 'calf', label: 'Becerro/a' },
  { value: 'heifer', label: 'Novilla' },
  { value: 'adult', label: 'Adulto' },
  { value: 'senior', label: 'Senior' },
];

export default function AddCattleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { addCattle, currentRanch } = useStore();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCattleDTO>({
    resolver: zodResolver(cattleSchema),
    defaultValues: {
      gender: 'FEMALE',
    },
  });

  const gender = watch('gender');

  const onSubmit = async (data: CreateCattleDTO) => {
    try {
      // Simular guardado en la base de datos
      const newCattle = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        birthDate: new Date(data.birthDate),
        ranchId: currentRanch?.id || '',
        status: 'ACTIVE' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      addCattle(newCattle);
      
      toast({
        title: "¡Éxito!",
        description: `${gender === 'FEMALE' ? 'Vaca' : 'Toro'} ${data.internalId} agregado correctamente`,
      });
      
      reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el animal. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nuevo Animal</CardTitle>
        <CardDescription>
          Información básica del animal. Puedes agregar más detalles después.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Género */}
          <div className="space-y-3">
            <Label>Género</Label>
            <RadioGroup
              defaultValue="FEMALE"
              onValueChange={(value) => setValue('gender', value as 'MALE' | 'FEMALE')}
            >
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors">
                  <RadioGroupItem value="MALE" id="male" />
                  <Label htmlFor="male" className="cursor-pointer font-normal">
                    🐂 Macho
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg px-4 py-2 cursor-pointer hover:bg-pink-50 transition-colors">
                  <RadioGroupItem value="FEMALE" id="female" />
                  <Label htmlFor="female" className="cursor-pointer font-normal">
                    🐄 Hembra
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="internalId">
                Nombre o Número interno <span className="text-red-500">*</span>
              </Label>
              <Input
                id="internalId"
                placeholder="Ej: 123 o Bonita"
                {...register('internalId')}
              />
              {errors.internalId && (
                <p className="text-sm text-red-500">{errors.internalId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">
                Raza <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setValue('breed', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una raza" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed} value={breed}>
                      {breed}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.breed && (
                <p className="text-sm text-red-500">{errors.breed.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">
                Fecha de nacimiento <span className="text-red-500">*</span>
              </Label>
              <Input
                id="birthDate"
                type="date"
                {...register('birthDate')}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">{errors.birthDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="developmentStage">Etapa de desarrollo</Label>
              <Select onValueChange={(value) => setValue('developmentStage', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una etapa" />
                </SelectTrigger>
                <SelectContent>
                  {developmentStages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Información adicional (colapsable) */}
          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-between"
              >
                {showAdvanced ? 'Tengo menos datos de mi animal' : 'Tengo más datos de mi animal'}
                <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="450"
                    {...register('weight', { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crossBreed">Raza de cruce</Label>
                  <Input
                    id="crossBreed"
                    placeholder="Ej: Simmental"
                    {...register('crossBreed')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purityLevel">Nivel de pureza</Label>
                  <Select onValueChange={(value) => setValue('purityLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FB">FB (100% Pura)</SelectItem>
                      <SelectItem value="F1">F1 (50%)</SelectItem>
                      <SelectItem value="F2">F2 (75%)</SelectItem>
                      <SelectItem value="F3">F3 (87.5%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {gender === 'FEMALE' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="lastBirth">Último parto</Label>
                      <Input
                        id="lastBirth"
                        type="date"
                        {...register('lastBirth')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lactationCycle">Ciclo de lactancia</Label>
                      <Input
                        id="lactationCycle"
                        type="number"
                        placeholder="1"
                        {...register('lactationCycle', { valueAsNumber: true })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reproductiveStage">Etapa reproductiva</Label>
                      <Select onValueChange={(value) => setValue('reproductiveStage', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona etapa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Vacía</SelectItem>
                          <SelectItem value="pregnant">Preñada</SelectItem>
                          <SelectItem value="lactating">En lactancia</SelectItem>
                          <SelectItem value="dry">Seca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Registrar'}
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}