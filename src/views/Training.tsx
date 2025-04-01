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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  GraduationCap,
  Play,
  Clock,
  Award,
  BarChart,
  Calendar,
  Users,
  Plane,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Monitor,
  Headphones,
  Gamepad2,
  Brain,
  Star,
  Download,
  Share2,
  PlusCircle,
} from "lucide-react";

function Training() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Mock data for training modules
  const trainingModules = [
    {
      id: "mod1",
      title: "Procedimentos de Emergência",
      category: "Segurança",
      duration: "2h 30min",
      difficulty: "Avançado",
      completion: 75,
      vr: true,
      ai: true,
      description:
        "Treinamento avançado para situações de emergência em voo, incluindo falhas de motor, despressurização e pouso forçado.",
    },
    {
      id: "mod2",
      title: "Atendimento VIP",
      category: "Serviço",
      duration: "1h 45min",
      difficulty: "Intermediário",
      completion: 100,
      vr: false,
      ai: true,
      description:
        "Técnicas e protocolos para oferecer um serviço de excelência aos passageiros premium.",
    },
    {
      id: "mod3",
      title: "Navegação em Condições Adversas",
      category: "Pilotagem",
      duration: "3h 15min",
      difficulty: "Avançado",
      completion: 30,
      vr: true,
      ai: true,
      description:
        "Simulação de voo em condições climáticas extremas, incluindo tempestades, neblina densa e turbulência severa.",
    },
    {
      id: "mod4",
      title: "Manutenção Preventiva",
      category: "Técnico",
      duration: "2h 00min",
      difficulty: "Intermediário",
      completion: 0,
      vr: false,
      ai: true,
      description:
        "Procedimentos de inspeção e manutenção preventiva para garantir a segurança e eficiência das aeronaves.",
    },
    {
      id: "mod5",
      title: "Comunicação em Crise",
      category: "Comunicação",
      duration: "1h 30min",
      difficulty: "Básico",
      completion: 50,
      vr: false,
      ai: true,
      description:
        "Estratégias de comunicação eficaz durante situações de crise, tanto com passageiros quanto com equipes de solo.",
    },
  ];

  // Mock data for training history
  const trainingHistory = [
    {
      id: 1,
      module: "Procedimentos de Emergência",
      date: "10 Nov 2023",
      score: 92,
      time: "2h 15min",
      feedback: "Excelente desempenho na simulação de pouso forçado",
    },
    {
      id: 2,
      module: "Atendimento VIP",
      date: "05 Nov 2023",
      score: 98,
      time: "1h 30min",
      feedback: "Demonstrou conhecimento excepcional dos protocolos VIP",
    },
    {
      id: 3,
      module: "Navegação em Condições Adversas",
      date: "28 Out 2023",
      score: 85,
      time: "3h 05min",
      feedback: "Bom desempenho, mas precisa melhorar na navegação em neblina",
    },
  ];

  // Mock data for upcoming training sessions
  const upcomingTraining = [
    {
      id: 1,
      module: "Manutenção Preventiva",
      date: "15 Dez 2023",
      time: "09:00 - 11:00",
      instructor: "Carlos Mendes",
      participants: 8,
    },
    {
      id: 2,
      module: "Comunicação em Crise",
      date: "18 Dez 2023",
      time: "14:00 - 15:30",
      instructor: "Ana Ferreira",
      participants: 12,
    },
  ];

  // Mock data for certifications
  const certifications = [
    {
      id: 1,
      name: "Piloto Comercial",
      issueDate: "Jan 2022",
      expiryDate: "Jan 2024",
      status: "Válido",
      progress: 75,
    },
    {
      id: 2,
      name: "Atendimento de Emergência",
      issueDate: "Mar 2023",
      expiryDate: "Mar 2025",
      status: "Válido",
      progress: 92,
    },
    {
      id: 3,
      name: "Operações em Condições Adversas",
      issueDate: "Jun 2021",
      expiryDate: "Jun 2023",
      status: "Expirado",
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8" />
            <h1 className="text-3xl font-bold">
              Treinamento Imersivo com IA + VR
            </h1>
          </div>
          <p className="text-xl max-w-3xl mb-8">
            Aprimore suas habilidades com simulações realistas e feedback
            personalizado de IA
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <Play className="h-4 w-4" /> Iniciar Novo Treinamento
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-primary/20 text-primary-foreground border-primary-foreground/20 hover:bg-primary/30 hover:text-primary-foreground"
            >
              <Calendar className="h-4 w-4" /> Agendar Sessão
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="modules" className="gap-2">
                <BookOpen className="h-4 w-4" /> Módulos
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="h-4 w-4" /> Agendamentos
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <BarChart className="h-4 w-4" /> Histórico
              </TabsTrigger>
              <TabsTrigger value="certifications" className="gap-2">
                <Award className="h-4 w-4" /> Certificações
              </TabsTrigger>
            </TabsList>

            {/* Training Modules Tab */}
            <TabsContent value="modules" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingModules.map((module) => (
                  <Card
                    key={module.id}
                    className={`overflow-hidden ${selectedModule === module.id ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <div
                      className="h-2 bg-primary"
                      style={{ width: `${module.completion}%` }}
                    ></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline">{module.category}</Badge>
                        <div className="flex gap-1">
                          {module.vr && (
                            <Badge variant="secondary" className="gap-1">
                              <Monitor className="h-3 w-3" /> VR
                            </Badge>
                          )}
                          {module.ai && (
                            <Badge variant="secondary" className="gap-1">
                              <Brain className="h-3 w-3" /> IA
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="mt-2">{module.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {module.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {module.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge
                          variant={
                            module.difficulty === "Básico"
                              ? "outline"
                              : module.difficulty === "Intermediário"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {module.difficulty}
                        </Badge>
                        <span className="text-sm">
                          {module.completion}% concluído
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 flex justify-between">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <BookOpen className="h-4 w-4" /> Detalhes
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Play className="h-4 w-4" />{" "}
                        {module.completion > 0 ? "Continuar" : "Iniciar"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                {/* Add New Module Card */}
                <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                  <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Adicionar Módulo</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Crie um novo módulo de treinamento personalizado
                  </p>
                  <Button variant="outline">Criar Módulo</Button>
                </Card>
              </div>
            </TabsContent>

            {/* Upcoming Training Tab */}
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sessões Agendadas</CardTitle>
                      <CardDescription>
                        Seus próximos treinamentos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {upcomingTraining.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingTraining.map((session) => (
                            <div
                              key={session.id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                            >
                              <div>
                                <h3 className="font-medium">
                                  {session.module}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" />{" "}
                                  {session.date}, {session.time}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                  <Users className="h-3.5 w-3.5" />{" "}
                                  {session.participants} participantes
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button size="sm">Participar</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Nenhuma sessão agendada
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Você não possui treinamentos agendados no momento.
                          </p>
                          <Button>Agendar Treinamento</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendário de Treinamentos</CardTitle>
                      <CardDescription>Visão mensal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Calendário interativo
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Ver Calendário Completo
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Training History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Treinamentos</CardTitle>
                  <CardDescription>Seus desempenhos anteriores</CardDescription>
                </CardHeader>
                <CardContent>
                  {trainingHistory.length > 0 ? (
                    <div className="space-y-6">
                      {trainingHistory.map((training) => (
                        <div
                          key={training.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <h3 className="font-medium">{training.module}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />{" "}
                                {training.date}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" /> Duração:{" "}
                                {training.time}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {training.score}%
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Pontuação
                              </div>
                              <div className="flex mt-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(training.score / 20) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Feedback da IA
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {training.feedback}
                            </p>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Download className="h-3.5 w-3.5" /> Relatório
                              Completo
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Nenhum histórico disponível
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Você ainda não completou nenhum treinamento.
                      </p>
                      <Button>Iniciar Primeiro Treinamento</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Suas Certificações</CardTitle>
                      <CardDescription>Certificados e licenças</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {certifications.length > 0 ? (
                        <div className="space-y-6">
                          {certifications.map((cert) => (
                            <div
                              key={cert.id}
                              className="border rounded-lg p-4"
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{cert.name}</h3>
                                    <Badge
                                      variant={
                                        cert.status === "Válido"
                                          ? "outline"
                                          : "destructive"
                                      }
                                    >
                                      {cert.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <Calendar className="h-3.5 w-3.5" />{" "}
                                    Emitido: {cert.issueDate}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />{" "}
                                    Validade: {cert.expiryDate}
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  {cert.status === "Válido" ? (
                                    <>
                                      <div className="text-sm">
                                        Tempo restante
                                      </div>
                                      <Progress
                                        value={cert.progress}
                                        className="w-32 h-2"
                                      />
                                      <div className="text-xs text-muted-foreground">
                                        {cert.progress}% restante
                                      </div>
                                    </>
                                  ) : (
                                    <Button size="sm" className="gap-1">
                                      <RotateCw className="h-3.5 w-3.5" />{" "}
                                      Renovar
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-end mt-4">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1"
                                  >
                                    <Download className="h-3.5 w-3.5" /> Baixar
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1"
                                  >
                                    <Share2 className="h-3.5 w-3.5" />{" "}
                                    Compartilhar
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Nenhuma certificação
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            Você ainda não possui certificações registradas.
                          </p>
                          <Button>Obter Primeira Certificação</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Certificações Disponíveis</CardTitle>
                      <CardDescription>
                        Expanda suas qualificações
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Piloto de Linha Aérea (PLA)",
                            difficulty: "Avançado",
                          },
                          {
                            name: "Gerenciamento de Recursos de Cabine",
                            difficulty: "Intermediário",
                          },
                          {
                            name: "Operações Internacionais",
                            difficulty: "Avançado",
                          },
                        ].map((cert, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{cert.name}</div>
                              <Badge
                                variant={
                                  cert.difficulty === "Básico"
                                    ? "outline"
                                    : cert.difficulty === "Intermediário"
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {cert.difficulty}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              Detalhes
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        Ver Todas
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <Gamepad2 className="h-12 w-12 mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          Simulação VR Imersiva
                        </h3>
                        <p className="text-primary-foreground/80 mb-4">
                          Experimente nossos treinamentos em realidade virtual
                          para uma experiência ainda mais realista
                        </p>
                        <Button variant="secondary">
                          Acessar Simulações VR
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* VR Training Experience */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Experiência de Treinamento VR + IA
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Combine a imersão da realidade virtual com o poder da inteligência
              artificial para um treinamento personalizado e ultrarrealista.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Monitor className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Ambiente 3D Realista
                  </h3>
                  <p className="text-muted-foreground">
                    Simulações detalhadas de cabines de aeronaves e situações de
                    voo com física realista.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Feedback da IA</h3>
                  <p className="text-muted-foreground">
                    Análise em tempo real do seu desempenho com recomendações
                    personalizadas para melhoria.
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
                  <h3 className="text-xl font-bold mb-2">Cenários Extremos</h3>
                  <p className="text-muted-foreground">
                    Treine para situações raras e perigosas em um ambiente
                    seguro e controlado.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-square md:aspect-auto bg-gray-100 relative">
                    {/* This would be replaced with an actual VR training image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Plane className="h-16 w-16 text-primary mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Simulação de Cockpit em VR
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">
                      Treinamento Adaptativo
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Nossa plataforma de treinamento utiliza IA para adaptar os
                      cenários ao seu nível de habilidade, criando desafios
                      progressivamente mais complexos à medida que você evolui.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Análise de Desempenho</h4>
                          <p className="text-sm text-muted-foreground">
                            Métricas detalhadas sobre suas ações e decisões
                            durante o treinamento.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">
                            Cenários Personalizados
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Treinamentos adaptados às suas necessidades
                            específicas de aprendizado.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Colaboração em Equipe</h4>
                          <p className="text-sm text-muted-foreground">
                            Treine com colegas em cenários multiplayer para
                            melhorar a coordenação.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-6 gap-2">
                      <Play className="h-4 w-4" /> Experimentar Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Training;
