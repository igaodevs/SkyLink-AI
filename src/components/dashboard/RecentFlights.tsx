import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Plane,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  FileEdit,
} from "lucide-react";

type FlightStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "delayed"
  | "cancelled";

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  status: FlightStatus;
  occupancyRate: number;
}

interface RecentFlightsProps {
  flights?: Flight[];
  title?: string;
}

const getStatusBadge = (status: FlightStatus) => {
  switch (status) {
    case "scheduled":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          Agendado
        </Badge>
      );
    case "in-progress":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Em Progresso
        </Badge>
      );
    case "completed":
      return (
        <Badge
          variant="outline"
          className="bg-gray-50 text-gray-700 border-gray-200"
        >
          Concluído
        </Badge>
      );
    case "delayed":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200"
        >
          Atrasado
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          Cancelado
        </Badge>
      );
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

const RecentFlights: React.FC<RecentFlightsProps> = ({
  flights = [
    {
      id: "1",
      flightNumber: "AV1234",
      origin: "São Paulo (GRU)",
      destination: "Rio de Janeiro (SDU)",
      departureTime: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
      arrivalTime: new Date(Date.now() + 1000 * 60 * 90), // 1.5 hours from now
      status: "scheduled" as FlightStatus,
      occupancyRate: 85,
    },
    {
      id: "2",
      flightNumber: "AV2345",
      origin: "Brasília (BSB)",
      destination: "Salvador (SSA)",
      departureTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      arrivalTime: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
      status: "in-progress" as FlightStatus,
      occupancyRate: 92,
    },
    {
      id: "3",
      flightNumber: "AV3456",
      origin: "Recife (REC)",
      destination: "Fortaleza (FOR)",
      departureTime: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      arrivalTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      status: "completed" as FlightStatus,
      occupancyRate: 78,
    },
    {
      id: "4",
      flightNumber: "AV4567",
      origin: "Belo Horizonte (CNF)",
      destination: "Porto Alegre (POA)",
      departureTime: new Date(Date.now() + 1000 * 60 * 120), // 2 hours from now
      arrivalTime: new Date(Date.now() + 1000 * 60 * 240), // 4 hours from now
      status: "delayed" as FlightStatus,
      occupancyRate: 65,
    },
    {
      id: "5",
      flightNumber: "AV5678",
      origin: "Curitiba (CWB)",
      destination: "Manaus (MAO)",
      departureTime: new Date(Date.now() + 1000 * 60 * 240), // 4 hours from now
      arrivalTime: new Date(Date.now() + 1000 * 60 * 480), // 8 hours from now
      status: "scheduled" as FlightStatus,
      occupancyRate: 45,
    },
  ],
  title = "Voos Recentes e Próximos",
}) => {
  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Plane className="h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[calc(300px-3rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Voo</TableHead>
                <TableHead>Rota</TableHead>
                <TableHead>Horários</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ocupação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell className="font-medium">
                    {flight.flightNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{flight.origin}</span>
                      <span className="text-xs text-gray-500">
                        → {flight.destination}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {format(flight.departureTime, "HH:mm", {
                          locale: ptBR,
                        })}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format(flight.arrivalTime, "HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(flight.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${flight.occupancyRate > 80 ? "bg-green-500" : flight.occupancyRate > 50 ? "bg-blue-500" : "bg-yellow-500"}`}
                          style={{ width: `${flight.occupancyRate}%` }}
                        />
                      </div>
                      <span className="text-xs">{flight.occupancyRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver detalhes</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4" />
                          <span>Editar voo</span>
                        </DropdownMenuItem>
                        {flight.status === "delayed" && (
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                            <span>Ver motivo do atraso</span>
                          </DropdownMenuItem>
                        )}
                        {flight.status === "scheduled" && (
                          <DropdownMenuItem>
                            <Clock className="mr-2 h-4 w-4 text-blue-500" />
                            <span>Atualizar horário</span>
                          </DropdownMenuItem>
                        )}
                        {flight.status === "in-progress" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            <span>Marcar como concluído</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentFlights;
