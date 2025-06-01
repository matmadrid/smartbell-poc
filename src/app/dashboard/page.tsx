// src/app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bell, 
  Milk, 
  Plus, 
  TrendingUp, 
  Calendar,
  DollarSign,
  CheckCircle2,
  Circle,
  ChevronDown
} from 'lucide-react';
import { useStore } from '@/store';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import AddCattleForm from '@/components/cattle/AddCattleForm';

export default function DashboardPage() {
  const { 
    currentRanch, 
    cattle, 
    tasks, 
    recentProductions,
    completeTask 
  } = useStore();
  
  const [stats, setStats] = useState({
    totalCattle: 0,
    activeCows: 0,
    todayProduction: 0,
    monthlyProduction: 0,
    pendingTasks: 0,
    estimatedRevenue: 0,
  });

  // Estado para controlar la visibilidad del formulario de agregar animal
  const [showAddCattleForm, setShowAddCattleForm] = useState(false);

  // Calcular estadísticas
  useEffect(() => {
    const activeCows = cattle.filter(c => 
      c.gender === 'FEMALE' && c.status === 'ACTIVE'
    ).length;
    
    const todayProd = recentProductions
      .filter(p => format(new Date(p.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'))
      .reduce((sum, p) => sum + p.liters, 0);
    
    const monthlyProd = recentProductions
      .filter(p => {
        const prodDate = new Date(p.date);
        const now = new Date();
        return prodDate.getMonth() === now.getMonth() && 
               prodDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, p) => sum + p.liters, 0);
    
    const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
    
    setStats({
      totalCattle: cattle.length,
      activeCows,
      todayProduction: todayProd,
      monthlyProduction: monthlyProd,
      pendingTasks,
      estimatedRevenue: monthlyProd * 22, // $22 por litro aproximadamente
    });
  }, [cattle, tasks, recentProductions]);

  const todayTasks = tasks
    .filter(t => {
      const taskDate = new Date(t.dueDate);
      const today = new Date();
      return taskDate.toDateString() === today.toDateString();
    })
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-smartbell-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-smartbell-blue" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Smartbell</h1>
              <Button variant="ghost" className="ml-4">
                {currentRanch?.name || 'Seleccionar Rancho'} 
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-smartbell-blue flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Formulario para agregar animal */}
        {showAddCattleForm && (
          <div className="mb-8">
            <AddCattleForm onSuccess={() => setShowAddCattleForm(false)} />
          </div>
        )}

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Animales</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">🐄</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCattle}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeCows} vacas activas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Producción Hoy</CardTitle>
              <Milk className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayProduction} L</div>
              <p className="text-xs text-muted-foreground">
                +15% vs ayer
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Producción Mensual</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyProduction} L</div>
              <Progress value={65} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos Estimados</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.estimatedRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Este mes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tareas del día */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tareas de Hoy</CardTitle>
                <CardDescription>
                  {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTasks.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No hay tareas pendientes para hoy
                    </p>
                  ) : (
                    todayTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => completeTask(task.id)}
                            className="h-5 w-5"
                          >
                            {task.status === 'COMPLETED' ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>
                          <div>
                            <p className={`font-medium ${
                              task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''
                            }`}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-sm text-muted-foreground">
                                {task.description}
                              </p>
                            )}
                          </div>
                        </div>
                        {task.cattleId && (
                          <span className="text-sm text-smartbell-blue">
                            🐄 Vaca #{task.cattleId}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Tarea
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Acciones rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Registrar Producción
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setShowAddCattleForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Animal
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Programar Vacunación
                </Button>
              </CardContent>
            </Card>

            {/* Progreso de registro */}
            <Card>
              <CardHeader>
                <CardTitle>Progreso de Registro</CardTitle>
                <CardDescription>
                  Completa tu información para aprovechar al máximo Smartbell
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Animales registrados</span>
                    <span className="text-sm font-medium">{stats.totalCattle}/50</span>
                  </div>
                  <Progress value={(stats.totalCattle / 50) * 100} />
                  <p className="text-xs text-muted-foreground">
                    Registra al menos 50 animales para obtener análisis detallados
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}