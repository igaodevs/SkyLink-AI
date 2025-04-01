import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Plane,
  RefreshCw,
  Filter,
  Search,
  MapPin,
  Cloud,
  ArrowUpDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  RotateCw,
  Settings,
  Calendar,
  ChevronDown,
} from "lucide-react";

function Flights() {
  const [activeTab, setActiveTab] = useState("current");

  // Mock data for flights
  const currentFlights = [
    {
      id: "FL1234",
      from: "São Paulo",
      to: "Rio de Janeiro",
      status: "Em voo",
      departure: "10:30",
      arrival: "11:45",
      occupancy: "87%",
      aircraft: "Boeing 737",
      gate: "A12",
    },
    {
      id: "FL5678",
      from: "Brasília",
      to: "Salvador",
      status: "Atrasado",
      departure: "11:15",
      arrival: "13:30",
      occupancy: "92%",
      aircraft: "Airbus A320",
      gate: "B05",
    },
    {
      id: "FL9012",
      from: "Recife",
      to: "Fortaleza",
      status: "Programado",
      departure: "14:00",
      arrival: "15:30",
      occupancy: "65%",
      aircraft: "Embraer E190",
      gate: "C08",
    },
    {
      id: "FL3456",
      from: "Belo Horizonte",
      to: "Curitiba",
      status: "Pousou",
      departure: "08:45",
      arrival: "10:15",
      occupancy: "78%",
      aircraft: "Boeing 737",
      gate: "A04",
    },
    {
      id: "FL7890",
      from: "Porto Alegre",
      to: "Florianópolis",
      status: "Programado",
      departure: "16:20",
      arrival: "17:15",
      occupancy: "55%",
      aircraft: "ATR 72",
      gate: "D02",
    },
  ];

  const futureFlights = [
    {
      id: "FL2345",
      from: "São Paulo",
      to: "Manaus",
      status: "Programado",
      departure: "08:00",
      arrival: "11:30",
      date: "Amanhã",
      occupancy: "72%",
      aircraft: "Boeing 787",
    },
    {
      id: "FL6789",
      from: "Rio de Janeiro",
      to: "Recife",
      status: "Programado",
      departure: "09:45",
      arrival: "12:15",
      date: "Amanhã",
      occupancy: "68%",
      aircraft: "Airbus A320",
    },
    {
      id: "FL0123",
      from: "Brasília",
      to: "Belém",
      status: "Programado",
      departure: "11:30",
      arrival: "14:00",
      date: "Em 2 dias",
      occupancy: "45%",
      aircraft: "Embraer E190",
    },
    {
      id: "FL4567",
      from: "Salvador",
      to: "Fortaleza",
      status: "Programado",
      departure: "13:15",
      arrival: "14:45",
      date: "Em 2 dias",
      occupancy: "38%",
      aircraft: "Boeing 737",
    },
    {
      id: "FL8901",
      from: "Curitiba",
      to: "Porto Alegre",
      status: "Programado",
      departure: "15:00",
      arrival: "16:15",
      date: "Em 3 dias",
      occupancy: "25%",
      aircraft: "ATR 72",
    },
  ];

  // Mock route suggestions
  const routeSuggestions = [
    {
      id: 1,
      flight: "FL5678",
      suggestion: "Desvio para evitar tempestade",
      impact: "+ 15 min",
      reason: "Condições climáticas",
      severity: "high",
    },
    {
      id: 2,
      flight: "FL9012",
      suggestion: "Altitude alternativa",
      impact: "+ 5 min",
      reason: "Tráfego aéreo",
      severity: "medium",
    },
    {
      id: 3,
      flight: "FL7890",
      suggestion: "Rota mais eficiente",
      impact: "- 10 min",
      reason: "Economia de combustível",
      severity: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Voos</h1>
          <p className="text-muted-foreground">
            Otimize rotas e monitore voos em tempo real
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" /> Calendário
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filtros
          </Button>
          <Button className="gap-2">
            <Plane className="h-4 w-4" /> Novo Voo
          </Button>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por número de voo, origem ou destino"
                className="pl-8"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="in-flight">Em voo</SelectItem>
                  <SelectItem value="scheduled">Programados</SelectItem>
                  <SelectItem value="delayed">Atrasados</SelectItem>
                  <SelectItem value="landed">Pousados</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Aeronave" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="boeing">Boeing</SelectItem>
                  <SelectItem value="airbus">Airbus</SelectItem>
                  <SelectItem value="embraer">Embraer</SelectItem>
                  <SelectItem value="atr">ATR</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flights List */}
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="current"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Voos Atuais</TabsTrigger>
              <TabsTrigger value="future">Voos Futuros</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-4 space-y-4">
              {currentFlights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden">
                  <div
                    className={`h-1 ${flight.status === "Em voo" ? "bg-blue-500" : flight.status === "Atrasado" ? "bg-amber-500" : flight.status === "Pousou" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Plane
                            className={`h-5 w-5 ${flight.status === "Em voo" ? "text-blue-500" : flight.status === "Atrasado" ? "text-amber-500" : flight.status === "Pousou" ? "text-green-500" : "text-gray-500"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{flight.id}</span>
                            <Badge
                              variant={
                                flight.status === "Em voo"
                                  ? "default"
                                  : flight.status === "Atrasado"
                                    ? "destructive"
                                    : flight.status === "Pousou"
                                      ? "outline"
                                      : "secondary"
                              }
                            >
                              {flight.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.aircraft} • Portão {flight.gate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {flight.from}
                          </div>
                          <div className="text-lg font-bold">
                            {flight.departure}
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="relative w-16 md:w-24">
                            <div className="border-t border-dashed border-muted-foreground w-full absolute top-1/2"></div>
                            <Plane className="h-4 w-4 text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Ocupação: {flight.occupancy}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{flight.to}</div>
                          <div className="text-lg font-bold">
                            {flight.arrival}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                Carregar mais voos
              </Button>
            </TabsContent>
            <TabsContent value="future" className="mt-4 space-y-4">
              {futureFlights.map((flight) => (
                <Card key={flight.id} className="overflow-hidden">
                  <div className="h-1 bg-gray-300"></div>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{flight.id}</span>
                            <Badge variant="secondary">{flight.date}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {flight.aircraft}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {flight.from}
                          </div>
                          <div className="text-lg font-bold">
                            {flight.departure}
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="relative w-16 md:w-24">
                            <div className="border-t border-dashed border-muted-foreground w-full absolute top-1/2"></div>
                            <Plane className="h-4 w-4 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Ocupação: {flight.occupancy}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{flight.to}</div>
                          <div className="text-lg font-bold">
                            {flight.arrival}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Detalhes
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                Carregar mais voos
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Map Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Mapa de Rotas</CardTitle>
              <CardDescription>Visualização em tempo real</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-md relative">
                {/* This would be replaced with an actual map component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Mapa interativo
                    </p>
                  </div>
                </div>
                {/* Sample flight paths */}
                <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="absolute top-1/2 left-1/3 h-2 w-2 rounded-full bg-amber-500"></div>
                <div className="absolute top-1/3 left-2/3 h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Abrir mapa completo
              </Button>
            </CardContent>
          </Card>

          {/* Optimization Button */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <RotateCw className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Otimização Automática
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  Recalcule rotas automaticamente com base em condições atuais
                </p>
                <Button variant="secondary" className="w-full">
                  Otimizar Rotas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Route Suggestions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sugestões de Alteração</CardTitle>
              <CardDescription>
                Baseadas em clima e tráfego aéreo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {routeSuggestions.map((suggestion) => (
                <Alert
                  key={suggestion.id}
                  variant="default"
                  className={`border-l-4 ${suggestion.severity === "high" ? "border-l-destructive" : suggestion.severity === "medium" ? "border-l-amber-500" : "border-l-blue-500"}`}
                >
                  <div className="flex items-start gap-2">
                    {suggestion.severity === "high" ? (
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    ) : suggestion.severity === "medium" ? (
                      <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <AlertTitle className="text-sm font-medium">
                          {suggestion.flight}
                        </AlertTitle>
                        <span
                          className={`text-xs font-medium ${suggestion.impact.startsWith("+") ? "text-destructive" : "text-green-500"}`}
                        >
                          {suggestion.impact}
                        </span>
                      </div>
                      <AlertDescription className="text-xs mt-1">
                        {suggestion.suggestion}
                      </AlertDescription>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.reason}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                          >
                            Ignorar
                          </Button>
                          <Button size="sm" className="h-6 text-xs">
                            Aplicar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
              <Button variant="outline" className="w-full">
                Ver todas as sugestões
              </Button>
            </CardContent>
          </Card>

          {/* Weather Info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Condições Climáticas</CardTitle>
              <CardDescription>Impacto nas operações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Cloud className="h-10 w-10 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">23°C</div>
                    <div className="text-sm text-muted-foreground">
                      São Paulo
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Atualizar
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Visibilidade</span>
                  <Badge variant="outline">Boa</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ventos</span>
                  <Badge variant="outline">12 km/h</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Precipitação</span>
                  <Badge variant="outline">10%</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Previsão detalhada
              </Button>
            </CardContent>
          </Card>

          {/* Manual Adjustment */}
          <Button variant="outline" className="w-full gap-2">
            <Settings className="h-4 w-4" /> Ajuste Manual
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Flights;
