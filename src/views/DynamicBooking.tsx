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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Plane,
  Search,
  Calendar,
  ArrowRight,
  CreditCard,
  Sparkles,
  Clock,
  Zap,
  Users,
  ArrowUpDown,
  Bell,
  Heart,
  Filter,
  ChevronDown,
  ChevronUp,
  Luggage,
  Coffee,
  Wifi,
  MapPin,
  Percent,
} from "lucide-react";

function DynamicBooking() {
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock flight suggestions
  const flightSuggestions = [
    {
      id: 1,
      from: "São Paulo",
      to: "Rio de Janeiro",
      departureDate: "15 Nov",
      departureTime: "08:30",
      arrivalTime: "09:30",
      price: 450,
      originalPrice: 550,
      airline: "AeroBrasil",
      discount: "18%",
      seats: 12,
      recommendation: "Melhor preço",
    },
    {
      id: 2,
      from: "São Paulo",
      to: "Rio de Janeiro",
      departureDate: "15 Nov",
      departureTime: "10:45",
      arrivalTime: "11:45",
      price: 520,
      originalPrice: 520,
      airline: "SkyConnect",
      discount: null,
      seats: 8,
      recommendation: null,
    },
    {
      id: 3,
      from: "São Paulo",
      to: "Rio de Janeiro",
      departureDate: "15 Nov",
      departureTime: "14:15",
      arrivalTime: "15:15",
      price: 380,
      originalPrice: 600,
      airline: "Voe Mais",
      discount: "37%",
      seats: 3,
      recommendation: "Oferta relâmpago",
    },
    {
      id: 4,
      from: "São Paulo",
      to: "Rio de Janeiro",
      departureDate: "16 Nov",
      departureTime: "07:00",
      arrivalTime: "08:00",
      price: 410,
      originalPrice: 480,
      airline: "AeroBrasil",
      discount: "15%",
      seats: 20,
      recommendation: "Dia seguinte: economize 15%",
    },
  ];

  // Mock personalized recommendations
  const personalizedRecommendations = [
    {
      id: 1,
      from: "São Paulo",
      to: "Recife",
      dates: "22-29 Nov",
      price: 780,
      reason: "Baseado em suas viagens anteriores",
    },
    {
      id: 2,
      from: "São Paulo",
      to: "Buenos Aires",
      dates: "10-17 Dez",
      price: 1250,
      reason: "Destino popular nesta época",
    },
    {
      id: 3,
      from: "São Paulo",
      to: "Fortaleza",
      dates: "5-12 Jan",
      price: 950,
      reason: "Você pesquisou recentemente",
    },
  ];

  // Mock price alerts
  const priceAlerts = [
    {
      id: 1,
      from: "São Paulo",
      to: "Salvador",
      dates: "10-17 Dez",
      currentPrice: 850,
      targetPrice: 750,
      status: "Monitorando",
    },
    {
      id: 2,
      from: "São Paulo",
      to: "Florianópolis",
      dates: "22-29 Jan",
      currentPrice: 620,
      targetPrice: 600,
      status: "Quase lá",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Search Section */}
      <section className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            Matchmaking Inteligente para Passagens
          </h1>
          <Card className="bg-background text-foreground">
            <CardContent className="p-6">
              <Tabs defaultValue="roundtrip" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="roundtrip">Ida e Volta</TabsTrigger>
                  <TabsTrigger value="oneway">Somente Ida</TabsTrigger>
                  <TabsTrigger value="multicity">
                    Múltiplos Destinos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="roundtrip" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origem</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="origin"
                          placeholder="De onde você vai sair?"
                          className="pl-8"
                          defaultValue="São Paulo"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destino</Label>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="destination"
                          placeholder="Para onde você vai?"
                          className="pl-8"
                          defaultValue="Rio de Janeiro"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departure">Data de Ida</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="departure"
                          placeholder="Selecione uma data"
                          className="pl-8"
                          defaultValue="15/11/2023"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="return">Data de Volta</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="return"
                          placeholder="Selecione uma data"
                          className="pl-8"
                          defaultValue="22/11/2023"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passageiros</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="passengers" className="w-[140px]">
                            <SelectValue placeholder="Passageiros" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Adulto</SelectItem>
                            <SelectItem value="2">2 Adultos</SelectItem>
                            <SelectItem value="3">3 Adultos</SelectItem>
                            <SelectItem value="4">4+ Adultos</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class">Classe</Label>
                        <Select defaultValue="economy">
                          <SelectTrigger id="class" className="w-[140px]">
                            <SelectValue placeholder="Classe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Econômica</SelectItem>
                            <SelectItem value="premium">
                              Premium Economy
                            </SelectItem>
                            <SelectItem value="business">Executiva</SelectItem>
                            <SelectItem value="first">
                              Primeira Classe
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2"
                      >
                        <Filter className="h-4 w-4" />
                        Filtros
                        {showFilters ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      <Button size="lg" className="gap-2">
                        <Search className="h-4 w-4" />
                        Buscar Voos
                      </Button>
                    </div>
                  </div>

                  {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg mt-4">
                      <div className="space-y-4">
                        <h3 className="font-medium">Faixa de Preço</h3>
                        <div className="space-y-2">
                          <Slider
                            defaultValue={[500, 2000]}
                            max={5000}
                            step={50}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>R$ {priceRange[0]}</span>
                            <span>R$ {priceRange[1]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Companhias Aéreas</h3>
                        <div className="space-y-2">
                          {[
                            "AeroBrasil",
                            "SkyConnect",
                            "Voe Mais",
                            "Global Airways",
                          ].map((airline, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Switch id={`airline-${index}`} defaultChecked />
                              <Label htmlFor={`airline-${index}`}>
                                {airline}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-medium">Preferências</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="direct-flights" defaultChecked />
                            <Label htmlFor="direct-flights">
                              Somente voos diretos
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="flexible-dates" />
                            <Label htmlFor="flexible-dates">
                              Datas flexíveis (±3 dias)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="include-nearby" />
                            <Label htmlFor="include-nearby">
                              Incluir aeroportos próximos
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="oneway">
                  {/* Similar structure to roundtrip but without return date */}
                  <div className="p-8 text-center text-muted-foreground">
                    Conteúdo para voos somente de ida seria similar, mas sem o
                    campo de data de retorno.
                  </div>
                </TabsContent>
                <TabsContent value="multicity">
                  {/* Form for multiple destinations */}
                  <div className="p-8 text-center text-muted-foreground">
                    Aqui seria um formulário para adicionar múltiplos trechos de
                    viagem.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dynamic Suggestions */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Sugestões Dinâmicas</h2>
            <Button variant="ghost" className="gap-2">
              <Zap className="h-4 w-4" /> Atualizar em tempo real
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {flightSuggestions.map((flight) => (
              <Card
                key={flight.id}
                className={
                  flight.recommendation ? "border-2 border-primary" : ""
                }
              >
                {flight.recommendation && (
                  <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>{flight.recommendation}</span>
                    </div>
                    {flight.discount && (
                      <Badge variant="secondary" className="gap-1">
                        <Percent className="h-3 w-3" /> {flight.discount}
                      </Badge>
                    )}
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-sm font-medium">{flight.from}</div>
                        <div className="text-xl font-bold">
                          {flight.departureTime}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {flight.departureDate}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="relative w-24 md:w-32">
                          <div className="border-t border-dashed border-muted-foreground w-full absolute top-1/2"></div>
                          <Plane className="h-4 w-4 text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {flight.airline}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{flight.to}</div>
                        <div className="text-xl font-bold">
                          {flight.arrivalTime}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Direto
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-2xl font-bold">
                        R$ {flight.price}
                      </div>
                      {flight.originalPrice > flight.price && (
                        <div className="text-sm text-muted-foreground line-through">
                          R$ {flight.originalPrice}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {flight.seats} assentos disponíveis
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <Heart className="h-4 w-4" /> Salvar
                      </Button>
                      <Button className="gap-2">
                        Selecionar <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex flex-wrap gap-3">
                    <Badge variant="outline" className="gap-1">
                      <Luggage className="h-3 w-3" /> Bagagem incluída
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Coffee className="h-3 w-3" /> Refeição a bordo
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Wifi className="h-3 w-3" /> Wi-Fi disponível
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Users className="h-3 w-3" /> Assentos espaçosos
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">Carregar mais opções</Button>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Recomendações Personalizadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {personalizedRecommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {rec.from} → {rec.to}
                  </CardTitle>
                  <CardDescription>{rec.dates}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">R$ {rec.price}</div>
                    <Badge variant="outline">{rec.reason}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    Não me interessa
                  </Button>
                  <Button size="sm">Ver detalhes</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price Alerts */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Notificações de Preço</h2>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" /> Criar novo alerta
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {priceAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        {alert.from} → {alert.to}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {alert.dates}
                      </p>
                    </div>
                    <Badge
                      variant={
                        alert.status === "Quase lá" ? "default" : "outline"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Preço atual:</span>
                      <span className="font-medium">
                        R$ {alert.currentPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seu alvo:</span>
                      <span className="font-medium">
                        R$ {alert.targetPrice}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{
                          width: `${(1 - (alert.currentPrice - alert.targetPrice) / alert.currentPrice) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm">
                      Remover
                    </Button>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Confirmation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Confirmação de Compra</h2>
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-muted-foreground">
                  Quando você selecionar um voo, o processo de compra será
                  iniciado aqui.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Detalhes do Voo</h3>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Plane className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Informações do voo selecionado
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Dados do Passageiro</h3>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Formulário para dados pessoais
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Pagamento</h3>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Opções de pagamento seguro
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button disabled className="gap-2">
                  Finalizar Compra <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default DynamicBooking;
