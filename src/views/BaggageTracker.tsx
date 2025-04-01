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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Plane,
  ArrowRight,
  QrCode,
  Truck,
  Clipboard,
  FileText,
  MessageSquare,
  RotateCw,
  ShieldCheck,
  Lock,
  History,
  ChevronDown,
} from "lucide-react";

function BaggageTracker() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Mock data for baggage tracking
  const baggageData = {
    id: "BG1234567",
    passengerName: "Carlos Silva",
    flight: "FL5678",
    origin: "São Paulo (GRU)",
    destination: "Paris (CDG)",
    departureDate: "15 Dez 2023",
    status: "Em trânsito",
    lastScan: "Terminal 2, Aeroporto Charles de Gaulle",
    lastScanTime: "14:35, 15 Dez 2023",
    weight: "23.5 kg",
    description: "Mala grande preta com etiqueta vermelha",
    blockchainVerified: true,
    trackingHistory: [
      {
        location: "Check-in, Aeroporto de Guarulhos",
        time: "08:15, 15 Dez 2023",
        status: "Registrada",
        verified: true,
      },
      {
        location: "Triagem, Aeroporto de Guarulhos",
        time: "09:20, 15 Dez 2023",
        status: "Em processamento",
        verified: true,
      },
      {
        location: "Carregamento, Aeroporto de Guarulhos",
        time: "10:05, 15 Dez 2023",
        status: "Embarcada",
        verified: true,
      },
      {
        location: "Voo FL5678",
        time: "11:30, 15 Dez 2023",
        status: "Em trânsito",
        verified: true,
      },
      {
        location: "Desembarque, Aeroporto Charles de Gaulle",
        time: "14:15, 15 Dez 2023",
        status: "Desembarcada",
        verified: true,
      },
      {
        location: "Terminal 2, Aeroporto Charles de Gaulle",
        time: "14:35, 15 Dez 2023",
        status: "Em trânsito para retirada",
        verified: true,
      },
    ],
  };

  // Mock data for lost baggage reports
  const lostBaggageReports = [
    {
      id: "LB7890",
      flight: "FL1234",
      reportDate: "10 Dez 2023",
      status: "Em investigação",
      description: "Mala média azul",
    },
    {
      id: "LB7891",
      flight: "FL5432",
      reportDate: "05 Dez 2023",
      status: "Localizada",
      description: "Mochila preta com laptop",
    },
  ];

  const handleTrack = () => {
    if (trackingNumber.trim() !== "") {
      setIsTracking(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-8 w-8" />
            <h1 className="text-3xl font-bold">
              Rastreamento de Bagagens via Blockchain
            </h1>
          </div>
          <p className="text-xl max-w-3xl mb-8">
            Acompanhe sua bagagem em tempo real com segurança e transparência
          </p>

          <Card className="bg-background text-foreground">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="tracking-number" className="mb-2 block">
                    Número de Rastreamento
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="tracking-number"
                      placeholder="Digite o código de rastreamento da sua bagagem"
                      className="pl-8"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleTrack} className="gap-2 h-10 px-6">
                    <Search className="h-4 w-4" /> Rastrear
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <QrCode className="h-4 w-4" />
                <span>
                  Você também pode escanear o QR code da sua etiqueta de bagagem
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tracking Results */}
      {isTracking && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Resultado do Rastreamento</h2>
              <Badge variant="outline" className="gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Verificado via
                Blockchain
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Baggage Info */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Bagagem #{baggageData.id}</CardTitle>
                        <CardDescription>
                          Registrada para {baggageData.passengerName}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`
                        ${
                          baggageData.status === "Entregue"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : baggageData.status === "Em trânsito"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : baggageData.status === "Atrasada"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      `}
                      >
                        {baggageData.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">
                          Voo
                        </Label>
                        <div className="font-medium">{baggageData.flight}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">
                          Data de Partida
                        </Label>
                        <div className="font-medium">
                          {baggageData.departureDate}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">
                          Origem
                        </Label>
                        <div className="font-medium">{baggageData.origin}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">
                          Destino
                        </Label>
                        <div className="font-medium">
                          {baggageData.destination}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Última Localização</h3>
                      <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">
                            {baggageData.lastScan}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {baggageData.lastScanTime}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">
                          Peso
                        </Label>
                        <div className="font-medium">{baggageData.weight}</div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">
                          Descrição
                        </Label>
                        <div className="font-medium">
                          {baggageData.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" /> Detalhes Completos
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" /> Reportar Problema
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Preview */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Localização em Tempo Real</CardTitle>
                    <CardDescription>
                      Visualize onde está sua bagagem
                    </CardDescription>
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
                      {/* Sample location marker */}
                      <div className="absolute top-1/2 left-1/2 h-4 w-4 rounded-full bg-primary animate-ping"></div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <RotateCw className="h-4 w-4" /> Atualizar Localização
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tracking Timeline */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Histórico de Movimentação</CardTitle>
                <CardDescription>
                  Registros imutáveis na blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>

                  <div className="space-y-6">
                    {baggageData.trackingHistory.map((event, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground z-10 mt-1.5">
                          {event.status === "Registrada" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : event.status.includes("Em") ? (
                            <Clock className="h-3 w-3" />
                          ) : event.status === "Embarcada" ||
                            event.status === "Desembarcada" ? (
                            <Plane className="h-3 w-3" />
                          ) : (
                            <Truck className="h-3 w-3" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              {event.location}
                            </h3>
                            {event.verified && (
                              <Badge
                                variant="outline"
                                className="gap-1 text-xs"
                              >
                                <Lock className="h-3 w-3" /> Verificado
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.time}
                          </div>
                          <div className="mt-1 text-sm">{event.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Blockchain Security */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Segurança Garantida pela Blockchain
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nossa tecnologia de rastreamento utiliza blockchain para garantir
              registros imutáveis e transparentes de toda a jornada da sua
              bagagem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Rastreamento Seguro
                  </h3>
                  <p className="text-muted-foreground">
                    Cada movimentação da sua bagagem é registrada de forma
                    segura e imutável na blockchain.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <History className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Histórico Completo</h3>
                  <p className="text-muted-foreground">
                    Acesse o histórico completo e verificável de toda a jornada
                    da sua bagagem.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Alertas em Tempo Real
                  </h3>
                  <p className="text-muted-foreground">
                    Receba notificações instantâneas sobre qualquer mudança no
                    status da sua bagagem.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lost Baggage Reports */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            Relatórios de Bagagem Extraviada
          </h2>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="active">Relatórios Ativos</TabsTrigger>
              <TabsTrigger value="resolved">Resolvidos</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {lostBaggageReports.filter(
                (report) => report.status === "Em investigação",
              ).length > 0 ? (
                lostBaggageReports
                  .filter((report) => report.status === "Em investigação")
                  .map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="font-medium">
                              Relatório #{report.id}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Voo {report.flight} • {report.reportDate}
                            </p>
                            <p className="text-sm mt-1">{report.description}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <Badge
                              variant="outline"
                              className="bg-amber-100 text-amber-800 border-amber-300"
                            >
                              {report.status}
                            </Badge>
                            <Button size="sm" className="gap-1">
                              <Search className="h-3.5 w-3.5" /> Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Nenhum relatório ativo
                  </h3>
                  <p className="text-muted-foreground">
                    Você não possui relatórios de bagagem extraviada ativos no
                    momento.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {lostBaggageReports.filter(
                (report) => report.status === "Localizada",
              ).length > 0 ? (
                lostBaggageReports
                  .filter((report) => report.status === "Localizada")
                  .map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h3 className="font-medium">
                              Relatório #{report.id}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Voo {report.flight} • {report.reportDate}
                            </p>
                            <p className="text-sm mt-1">{report.description}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 border-green-300"
                            >
                              {report.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Search className="h-3.5 w-3.5" /> Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Nenhum relatório resolvido
                  </h3>
                  <p className="text-muted-foreground">
                    Você não possui relatórios de bagagem extraviada resolvidos
                    no momento.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Bagagem extraviada?</AlertTitle>
              <AlertDescription>
                Se você não consegue localizar sua bagagem, registre um
                relatório imediatamente para iniciarmos o processo de busca.
              </AlertDescription>
              <div className="mt-4">
                <Button>Registrar Bagagem Extraviada</Button>
              </div>
            </Alert>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>

          <div className="space-y-4">
            {[
              {
                question: "Como funciona o rastreamento via blockchain?",
                answer:
                  "Nossa tecnologia registra cada movimentação da sua bagagem em uma blockchain, criando um registro imutável e verificável de toda a jornada da sua mala, desde o check-in até a entrega final.",
              },
              {
                question: "O que fazer se minha bagagem for extraviada?",
                answer:
                  "Registre imediatamente um relatório de bagagem extraviada em nosso sistema. Nossa tecnologia blockchain facilita a localização rápida de bagagens extraviadas, com taxa de recuperação superior a 99.7%.",
              },
              {
                question: "Posso rastrear múltiplas bagagens ao mesmo tempo?",
                answer:
                  "Sim, você pode rastrear todas as suas bagagens simultaneamente através da nossa plataforma, visualizando a localização de cada uma em tempo real.",
              },
              {
                question: "Como recebo atualizações sobre minha bagagem?",
                answer:
                  "Você receberá notificações por e-mail e SMS a cada movimentação significativa da sua bagagem. Também pode acompanhar em tempo real através desta plataforma.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-muted-foreground">{faq.answer}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BaggageTracker;
