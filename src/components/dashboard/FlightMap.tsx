import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plane,
  Cloud,
  Wind,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Layers,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  status: "on-time" | "delayed" | "diverted" | "cancelled";
  position: { lat: number; lng: number };
  altitude: number;
  speed: number;
  heading: number;
}

interface WeatherAlert {
  id: string;
  type: "storm" | "turbulence" | "fog";
  severity: "low" | "medium" | "high";
  position: { lat: number; lng: number };
  radius: number;
}

interface FlightMapProps {
  flights?: Flight[];
  weatherAlerts?: WeatherAlert[];
  onFlightSelect?: (flight: Flight) => void;
  onWeatherAlertSelect?: (alert: WeatherAlert) => void;
}

const FlightMap = ({
  flights = [
    {
      id: "1",
      flightNumber: "AA1234",
      origin: "JFK",
      destination: "LAX",
      status: "on-time" as const,
      position: { lat: 40.7, lng: -74.0 },
      altitude: 35000,
      speed: 550,
      heading: 270,
    },
    {
      id: "2",
      flightNumber: "UA5678",
      origin: "ORD",
      destination: "SFO",
      status: "delayed" as const,
      position: { lat: 41.9, lng: -87.6 },
      altitude: 32000,
      speed: 520,
      heading: 260,
    },
    {
      id: "3",
      flightNumber: "DL9012",
      origin: "ATL",
      destination: "MIA",
      status: "diverted" as const,
      position: { lat: 33.7, lng: -84.4 },
      altitude: 28000,
      speed: 480,
      heading: 150,
    },
  ],
  weatherAlerts = [
    {
      id: "w1",
      type: "storm" as const,
      severity: "high" as const,
      position: { lat: 39.1, lng: -84.5 },
      radius: 100,
    },
    {
      id: "w2",
      type: "turbulence" as const,
      severity: "medium" as const,
      position: { lat: 36.1, lng: -115.2 },
      radius: 75,
    },
    {
      id: "w3",
      type: "fog" as const,
      severity: "low" as const,
      position: { lat: 37.8, lng: -122.4 },
      radius: 50,
    },
  ],
  onFlightSelect = () => {},
  onWeatherAlertSelect = () => {},
}: FlightMapProps) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedWeatherAlert, setSelectedWeatherAlert] =
    useState<WeatherAlert | null>(null);
  const [mapView, setMapView] = useState<"standard" | "satellite" | "weather">(
    "standard",
  );
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [showFlightDetails, setShowFlightDetails] = useState<boolean>(false);
  const [showWeatherDetails, setShowWeatherDetails] = useState<boolean>(false);

  // Handle flight selection
  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowFlightDetails(true);
    onFlightSelect(flight);
  };

  // Handle weather alert selection
  const handleWeatherAlertClick = (alert: WeatherAlert) => {
    setSelectedWeatherAlert(alert);
    setShowWeatherDetails(true);
    onWeatherAlertSelect(alert);
  };

  // Zoom controls
  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 10));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 1));

  // Simulate flight movement (in a real app, this would be replaced with real-time data)
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with actual data updates from an API
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Plane className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Flight Map</h3>
          <Badge variant="outline" className="ml-2">
            {flights.length} Active Flights
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Tabs
            defaultValue="standard"
            value={mapView}
            onValueChange={(value) => setMapView(value as any)}
          >
            <TabsList>
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="satellite">Satellite</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="relative flex-grow bg-slate-100 overflow-hidden">
        {/* Map Background - In a real implementation, this would be replaced with a proper map library like Google Maps, Mapbox, etc. */}
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(${
              mapView === "satellite"
                ? "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=1200&q=80"
                : mapView === "weather"
                  ? "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&q=80"
                  : "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: `brightness(${mapView === "weather" ? "0.9" : "1"})`,
            transform: `scale(${1 + (zoomLevel - 5) * 0.1})`,
          }}
        >
          {/* Flight Markers */}
          {flights.map((flight) => (
            <motion.div
              key={flight.id}
              className="absolute cursor-pointer"
              style={{
                left: `${((flight.position.lng + 180) / 360) * 100}%`,
                top: `${((90 - flight.position.lat) / 180) * 100}%`,
                transform: `rotate(${flight.heading}deg)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleFlightClick(flight)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-1 rounded-full ${flight.status === "on-time" ? "bg-green-500" : flight.status === "delayed" ? "bg-yellow-500" : flight.status === "diverted" ? "bg-orange-500" : "bg-red-500"}`}
                    >
                      <Plane className="h-4 w-4 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{flight.flightNumber}</p>
                    <p>
                      {flight.origin} → {flight.destination}
                    </p>
                    <p className="capitalize">{flight.status}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}

          {/* Weather Alert Markers */}
          {mapView === "weather" &&
            weatherAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${((alert.position.lng + 180) / 360) * 100}%`,
                  top: `${((90 - alert.position.lat) / 180) * 100}%`,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => handleWeatherAlertClick(alert)}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`rounded-full ${alert.severity === "high" ? "bg-red-500/70" : alert.severity === "medium" ? "bg-orange-500/70" : "bg-yellow-500/70"}`}
                        style={{
                          width: `${alert.radius / 5}px`,
                          height: `${alert.radius / 5}px`,
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {alert.type === "storm" ? (
                            <Cloud className="h-5 w-5 text-white" />
                          ) : alert.type === "turbulence" ? (
                            <Wind className="h-5 w-5 text-white" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-white" />
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold capitalize">{alert.type}</p>
                      <p>
                        Severity:{" "}
                        <span className="capitalize">{alert.severity}</span>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <Button variant="secondary" size="icon" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => {}}>
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => {}}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Flight Details Dialog */}
      <Dialog open={showFlightDetails} onOpenChange={setShowFlightDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Plane className="h-5 w-5 mr-2 text-blue-500" />
              Flight {selectedFlight?.flightNumber}
            </DialogTitle>
          </DialogHeader>
          {selectedFlight && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Origin</p>
                  <p className="font-medium">{selectedFlight.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium">{selectedFlight.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant={
                      selectedFlight.status === "on-time"
                        ? "default"
                        : selectedFlight.status === "delayed"
                          ? "warning"
                          : selectedFlight.status === "diverted"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {selectedFlight.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Altitude</p>
                  <p className="font-medium">
                    {selectedFlight.altitude.toLocaleString()} ft
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Speed</p>
                  <p className="font-medium">{selectedFlight.speed} knots</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Heading</p>
                  <p className="font-medium">{selectedFlight.heading}°</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Flight Path</h4>
                <div className="h-32 bg-slate-100 rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Flight path visualization would appear here
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFlightDetails(false)}
                >
                  Close
                </Button>
                <Button>Track Flight</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Weather Alert Details Dialog */}
      <Dialog open={showWeatherDetails} onOpenChange={setShowWeatherDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedWeatherAlert?.type === "storm" ? (
                <Cloud className="h-5 w-5 mr-2 text-blue-500" />
              ) : selectedWeatherAlert?.type === "turbulence" ? (
                <Wind className="h-5 w-5 mr-2 text-blue-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-500" />
              )}
              {selectedWeatherAlert?.type.charAt(0).toUpperCase() +
                selectedWeatherAlert?.type.slice(1)}{" "}
              Alert
            </DialogTitle>
          </DialogHeader>
          {selectedWeatherAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">
                    {selectedWeatherAlert.type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Severity</p>
                  <Badge
                    variant={
                      selectedWeatherAlert.severity === "high"
                        ? "destructive"
                        : selectedWeatherAlert.severity === "medium"
                          ? "warning"
                          : "default"
                    }
                  >
                    {selectedWeatherAlert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="font-medium">
                    {selectedWeatherAlert.position.lat.toFixed(2)},{" "}
                    {selectedWeatherAlert.position.lng.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Affected Area</p>
                  <p className="font-medium">
                    {selectedWeatherAlert.radius} miles radius
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Affected Flights</h4>
                <div className="h-32 bg-slate-100 rounded-md p-3 overflow-y-auto">
                  {flights
                    .filter((flight) => {
                      // Simple distance calculation (not accurate for Earth's curvature)
                      const dx =
                        flight.position.lng - selectedWeatherAlert.position.lng;
                      const dy =
                        flight.position.lat - selectedWeatherAlert.position.lat;
                      const distance = Math.sqrt(dx * dx + dy * dy) * 111; // Rough conversion to km
                      return distance < selectedWeatherAlert.radius;
                    })
                    .map((flight) => (
                      <div
                        key={flight.id}
                        className="flex items-center justify-between py-1"
                      >
                        <div className="flex items-center">
                          <Plane className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{flight.flightNumber}</span>
                        </div>
                        <Badge variant="outline">{flight.status}</Badge>
                      </div>
                    ))}
                  {!flights.some((flight) => {
                    const dx =
                      flight.position.lng - selectedWeatherAlert.position.lng;
                    const dy =
                      flight.position.lat - selectedWeatherAlert.position.lat;
                    const distance = Math.sqrt(dx * dx + dy * dy) * 111;
                    return distance < selectedWeatherAlert.radius;
                  }) && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No flights currently affected
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowWeatherDetails(false)}
                >
                  Close
                </Button>
                <Button>Send Alerts</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FlightMap;
