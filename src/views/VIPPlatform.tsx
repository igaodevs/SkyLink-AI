import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  Star,
  Calendar,
  Clock,
  Utensils,
  Plane,
  MessageSquare,
  History,
  Settings,
  User,
  Coffee,
  Music,
  Thermometer,
  Lamp,
  Wifi,
  Headphones,
  Briefcase,
  Car,
  CreditCard,
  CheckCircle2,
  PlusCircle,
} from "lucide-react";

function VIPPlatform() {
  const [temperature, setTemperature] = useState([22]);
  const [brightness, setBrightness] = useState([70]);

  // Mock data for travel history
  const travelHistory = [
    {
      id: 1,
      from: "São Paulo",
      to: "Paris",
      date: "10 Out 2023",
      class: "Primeira Classe",
      aircraft: "Boeing 777",
      rating: 5,
    },
    {
      id: 2,
      from: "Paris",
      to: "São Paulo",
      date: "24 Out 2023",
      class: "Primeira Classe",
      aircraft: "Boeing 777",
      rating: 4,
    },
    {
      id: 3,
      from: "São Paulo",
      to: "Nova York",
      date: "15 Ago 2023",
      class: "Executiva",
      aircraft: "Boeing 787",
      rating: 5,
    },
    {
      id: 4,
      from: "Nova York",
      to: "São Paulo",
      date: "22 Ago 2023",
      class: "Executiva",
      aircraft: "Boeing 787",
      rating: 5,
    },
  ];

  // Mock data for upcoming flights
  const upcomingFlights = [
    {
      id: 1,
      from: "São Paulo",
      to: "Tóquio",
      date: "15 Dez 2023",
      class: "Primeira Classe",
      aircraft: "Boeing 777",
      status: "Confirmado",
    },
  ];

  // Mock data for lounge options
  const loungeOptions = [
    {
      id: 1,
      name: "Lounge Executivo",
      location: "Terminal 3",
      features: ["Buffet completo", "Chuveiros", "Área de descanso"],
      available: true,
    },
    {
      id: 2,
      name: "Lounge VIP",
      location: "Terminal 2",
      features: ["Chef particular", "Salas privativas", "Spa"],
      available: true,
    },
    {
      id: 3,
      name: "Lounge Primeira Classe",
      location: "Terminal 3",
      features: [
        "Serviço de concierge",
        "Transfer exclusivo",
        "Degustação de vinhos",
      ],
      available: true,
    },
  ];

  // Mock data for meal preferences
  const mealOptions = [
    {
      id: 1,
      name: "Menu Gourmet",
      description: "Pratos elaborados por chefs renomados",
      price: "Incluído",
    },
    {
      id: 2,
      name: "Menu Vegetariano",
      description: "Opções vegetarianas premium",
      price: "Incluído",
    },
    {
      id: 3,
      name: "Menu Asiático",
      description: "Especialidades da culinária asiática",
      price: "Incluído",
    },
    {
      id: 4,
      name: "Menu Mediterrâneo",
      description: "Pratos frescos da culinária mediterrânea",
      price: "Incluído",
    },
    {
      id: 5,
      name: "Menu Personalizado",
      description: "Criado especialmente para suas preferências",
      price: "+R$ 150",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Plataforma VIP</h1>
          </div>
          <p className="text-xl max-w-3xl">
            Experiências personalizadas para nossos passageiros premium
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <Star className="h-4 w-4" /> Benefícios Premium
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-primary/20 text-primary-foreground border-primary-foreground/20 hover:bg-primary/30 hover:text-primary-foreground"
            >
              <MessageSquare className="h-4 w-4" /> Atendimento 24/7
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upcoming" className="gap-2">
                <Plane className="h-4 w-4" /> Próximo Voo
              </TabsTrigger>
              <TabsTrigger value="services" className="gap-2">
                <Coffee className="h-4 w-4" /> Serviços
              </TabsTrigger>
              <TabsTrigger value="experience" className="gap-2">
                <Music className="h-4 w-4" /> Experiência a Bordo
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" /> Histórico
              </TabsTrigger>
            </TabsList>

            {/* Upcoming Flight Tab */}
            <TabsContent value="upcoming" className="mt-6">
              {upcomingFlights.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Seu próximo voo</CardTitle>
                        <CardDescription>
                          Personalize sua experiência
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {upcomingFlights[0].from}
                              </div>
                              <div className="text-2xl font-bold">GRU</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="relative w-24 md:w-32">
                                <div className="border-t border-dashed border-muted-foreground w-full absolute top-1/2"></div>
                                <Plane className="h-5 w-5 text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {upcomingFlights[0].aircraft}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {upcomingFlights[0].to}
                              </div>
                              <div className="text-2xl font-bold">HND</div>
                            </div>
                          </div>
                          <div>
                            <Badge className="mb-2">
                              {upcomingFlights[0].status}
                            </Badge>
                            <div className="text-sm">
                              {upcomingFlights[0].date}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {upcomingFlights[0].class}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">
                              Serviços Pré-Selecionados
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                <Car className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <div className="font-medium">
                                    Transfer Executivo
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Confirmado para 15 Dez, 18:00
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                <Utensils className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <div className="font-medium">
                                    Menu Gourmet
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Seleção de pratos premium
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-3">
                              Adicionar Serviços
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Button
                                variant="outline"
                                className="h-auto py-3 flex flex-col items-center gap-2 justify-center"
                              >
                                <PlusCircle className="h-5 w-5 text-primary" />
                                <span>Fast Track</span>
                                <span className="text-xs text-muted-foreground">
                                  Acesso prioritário
                                </span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-auto py-3 flex flex-col items-center gap-2 justify-center"
                              >
                                <PlusCircle className="h-5 w-5 text-primary" />
                                <span>Spa no Lounge</span>
                                <span className="text-xs text-muted-foreground">
                                  Massagem relaxante
                                </span>
                              </Button>
                              <Button
                                variant="outline"
                                className="h-auto py-3 flex flex-col items-center gap-2 justify-center"
                              >
                                <PlusCircle className="h-5 w-5 text-primary" />
                                <span>Concierge</span>
                                <span className="text-xs text-muted-foreground">
                                  Assistência exclusiva
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Modificar Voo</Button>
                        <Button>Salvar Preferências</Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Status VIP</CardTitle>
                        <CardDescription>
                          Seus benefícios exclusivos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Crown className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Platinum Elite</div>
                            <div className="text-sm text-muted-foreground">
                              Membro desde 2018
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Pontos acumulados</span>
                            <Badge variant="outline">125.750</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Próximo nível</span>
                            <Badge variant="outline">
                              Diamond (24.250 pts)
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Bagagem extra</span>
                            <Badge variant="outline">3 volumes</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Acesso a lounges</span>
                            <Badge variant="outline">Ilimitado</Badge>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-6">
                          Ver todos os benefícios
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Plane className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Nenhum voo agendado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Você não possui voos agendados no momento.
                  </p>
                  <Button>Reservar um voo</Button>
                </div>
              )}
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lounge Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lounges Disponíveis</CardTitle>
                    <CardDescription>
                      Reserve seu acesso antecipadamente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {loungeOptions.map((lounge) => (
                      <div key={lounge.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{lounge.name}</h3>
                          <Badge
                            variant={lounge.available ? "outline" : "secondary"}
                          >
                            {lounge.available ? "Disponível" : "Lotado"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {lounge.location}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {lounge.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="font-normal"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={!lounge.available}
                        >
                          {lounge.available
                            ? "Reservar Acesso"
                            : "Indisponível"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Meal Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Refeição</CardTitle>
                    <CardDescription>
                      Personalize sua experiência gastronômica
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mealOptions.map((meal) => (
                        <div
                          key={meal.id}
                          className="flex items-start gap-3 p-3 border rounded-lg"
                        >
                          <Checkbox id={`meal-${meal.id}`} className="mt-1" />
                          <div className="flex-1">
                            <Label
                              htmlFor={`meal-${meal.id}`}
                              className="font-medium"
                            >
                              {meal.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {meal.description}
                            </p>
                          </div>
                          <Badge variant="outline">{meal.price}</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="allergies">
                          Alergias ou Restrições
                        </Label>
                        <Input
                          id="allergies"
                          placeholder="Informe suas restrições alimentares"
                        />
                      </div>
                      <div>
                        <Label htmlFor="special-requests">
                          Solicitações Especiais
                        </Label>
                        <Input
                          id="special-requests"
                          placeholder="Alguma solicitação especial?"
                        />
                      </div>
                    </div>
                    <Button className="w-full mt-6">Salvar Preferências</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personalização da Experiência a Bordo</CardTitle>
                  <CardDescription>
                    Ajuste as configurações para seu próximo voo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label
                            htmlFor="temperature"
                            className="flex items-center gap-2"
                          >
                            <Thermometer className="h-4 w-4" /> Temperatura
                          </Label>
                          <span className="text-sm">{temperature}°C</span>
                        </div>
                        <Slider
                          id="temperature"
                          min={18}
                          max={26}
                          step={1}
                          value={temperature}
                          onValueChange={setTemperature}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Mais frio</span>
                          <span>Mais quente</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label
                            htmlFor="brightness"
                            className="flex items-center gap-2"
                          >
                            <Lamp className="h-4 w-4" /> Iluminação
                          </Label>
                          <span className="text-sm">{brightness}%</span>
                        </div>
                        <Slider
                          id="brightness"
                          min={0}
                          max={100}
                          step={5}
                          value={brightness}
                          onValueChange={setBrightness}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Mais escuro</span>
                          <span>Mais claro</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="flex items-center gap-2">
                          <Music className="h-4 w-4" /> Preferências de Música
                        </Label>
                        <Select defaultValue="jazz">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um estilo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jazz">Jazz & Blues</SelectItem>
                            <SelectItem value="classical">
                              Música Clássica
                            </SelectItem>
                            <SelectItem value="ambient">
                              Ambiente & Relaxamento
                            </SelectItem>
                            <SelectItem value="pop">
                              Pop Internacional
                            </SelectItem>
                            <SelectItem value="brazilian">MPB</SelectItem>
                            <SelectItem value="none">Sem música</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">
                          Configurações Adicionais
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="wifi"
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Wifi className="h-4 w-4" /> Wi-Fi de Alta
                              Velocidade
                            </Label>
                            <Switch id="wifi" defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="do-not-disturb"
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <User className="h-4 w-4" /> Modo Não Perturbe
                            </Label>
                            <Switch id="do-not-disturb" />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="headphones"
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Headphones className="h-4 w-4" /> Fones de Ouvido
                              Premium
                            </Label>
                            <Switch id="headphones" defaultChecked />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="wake-up"
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <Clock className="h-4 w-4" /> Serviço de Despertar
                            </Label>
                            <Switch id="wake-up" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">
                          Solicitações Especiais
                        </h3>
                        <Input
                          placeholder="Descreva qualquer solicitação especial para sua viagem"
                          className="mb-2"
                        />
                        <p className="text-xs text-muted-foreground">
                          Nossa equipe fará o possível para atender suas
                          solicitações.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-8">Salvar Configurações</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Viagens</CardTitle>
                  <CardDescription>
                    Suas experiências anteriores conosco
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {travelHistory.map((trip) => (
                      <div key={trip.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {trip.from}
                              </div>
                              <div className="text-lg font-bold">GRU</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="relative w-16 md:w-24">
                                <div className="border-t border-dashed border-muted-foreground w-full absolute top-1/2"></div>
                                <Plane className="h-4 w-4 text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {trip.date}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {trip.to}
                              </div>
                              <div className="text-lg font-bold">CDG</div>
                            </div>
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {trip.class}
                            </Badge>
                            <div className="text-sm text-muted-foreground">
                              {trip.aircraft}
                            </div>
                            <div className="flex mt-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < trip.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="ghost" size="sm">
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    Ver histórico completo
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 24/7 Support */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-primary text-primary-foreground rounded-lg">
            <div className="flex items-center gap-4">
              <div className="bg-primary-foreground/20 p-3 rounded-full">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Atendimento VIP 24/7</h3>
                <p>Assistência exclusiva para nossos membros premium</p>
              </div>
            </div>
            <Button variant="secondary" size="lg" className="gap-2">
              <MessageSquare className="h-4 w-4" /> Iniciar Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VIPPlatform;
