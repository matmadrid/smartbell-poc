// src/types/index.ts

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ranch {
  id: string;
  name: string;
  location?: string;
  size?: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cattle {
  id: string;
  internalId: string;
  breed: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: Date;
  weight?: number;
  ranchId: string;
  
  crossBreed?: string;
  purityLevel?: string;
  developmentStage?: string;
  
  fatherId?: string;
  motherId?: string;
  
  lastBirth?: Date;
  lactationCycle?: number;
  reproductiveStage?: string;
  
  status: 'ACTIVE' | 'SOLD' | 'DECEASED' | 'RETIRED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Production {
  id: string;
  cattleId: string;
  ranchId: string;
  liters: number;
  date: Date;
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING';
  quality?: string;
  notes?: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  frequency: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  userId: string;
  ranchId: string;
  cattleId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

// DTOs para formularios
export interface CreateCattleDTO {
  internalId: string;
  breed: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  weight?: number;
  crossBreed?: string;
  purityLevel?: string;
  developmentStage?: string;
  fatherId?: string;
  motherId?: string;
  lastBirth?: string;
  lactationCycle?: number;
  reproductiveStage?: string;
}

export interface CreateProductionDTO {
  cattleId: string;
  liters: number;
  date: string;
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING';
  quality?: string;
  notes?: string;
}

// Estadísticas del Dashboard
export interface DashboardStats {
  totalCattle: number;
  activeCows: number;
  todayProduction: number;
  monthlyProduction: number;
  pendingTasks: number;
  estimatedRevenue: number;
}