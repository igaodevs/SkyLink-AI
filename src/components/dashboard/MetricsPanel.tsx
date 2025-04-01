import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  ArrowUp,
  ArrowDown,
  Clock,
  Luggage,
  Users,
  Plane,
  AlertTriangle,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = 0,
  icon = <Users className="h-4 w-4" />,
  description = "Description of this metric",
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-1 bg-gray-100 rounded-md">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          {change > 0 ? (
            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
          ) : change < 0 ? (
            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
          ) : null}
          <span
            className={`text-xs ${change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-gray-500"}`}
          >
            {change > 0 ? "+" : ""}
            {change}% from last period
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      </CardContent>
    </Card>
  );
};

interface MetricsPanelProps {
  occupancyRate?: number;
  delayPrediction?: number;
  baggageEfficiency?: number;
  fuelEfficiency?: number;
  maintenanceAlerts?: number;
}

const MetricsPanel = ({
  occupancyRate = 78,
  delayPrediction = 12,
  baggageEfficiency = 94,
  fuelEfficiency = 86,
  maintenanceAlerts = 3,
}: MetricsPanelProps) => {
  return (
    <div className="w-full h-full bg-gray-50 rounded-lg p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Flight Occupancy"
              value={`${occupancyRate}%`}
              change={2.5}
              icon={<Users className="h-4 w-4" />}
              description="Average seat occupancy across all flights"
            />
            <MetricCard
              title="Delay Prediction"
              value={`${delayPrediction}%`}
              change={-3.2}
              icon={<Clock className="h-4 w-4" />}
              description="Flights predicted to experience delays"
            />
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Weekly Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Baggage Handling</span>
                  <span className="text-sm font-medium">
                    {baggageEfficiency}%
                  </span>
                </div>
                <Progress value={baggageEfficiency} className="h-2" />

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">Fuel Efficiency</span>
                  <span className="text-sm font-medium">{fuelEfficiency}%</span>
                </div>
                <Progress value={fuelEfficiency} className="h-2" />

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">On-time Departures</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Baggage Efficiency"
              value={`${baggageEfficiency}%`}
              change={1.8}
              icon={<Luggage className="h-4 w-4" />}
              description="Successful baggage handling rate"
            />
            <MetricCard
              title="Fuel Efficiency"
              value={`${fuelEfficiency}%`}
              change={3.5}
              icon={<Plane className="h-4 w-4" />}
              description="Fuel optimization across fleet"
            />
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Efficiency Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Ground Operations</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Crew Utilization</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Aircraft Turnaround</span>
                    <span className="text-sm font-medium">79%</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard
              title="Delay Risk"
              value={`${delayPrediction}%`}
              change={-3.2}
              icon={<Clock className="h-4 w-4" />}
              description="AI-predicted delay probability"
            />
            <MetricCard
              title="Maintenance Alerts"
              value={maintenanceAlerts.toString()}
              change={1}
              icon={<AlertTriangle className="h-4 w-4" />}
              description="Preventive maintenance needed"
            />
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                7-Day Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Passenger Volume</span>
                    <span className="text-sm font-medium">+12%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Weather Impact</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Route Congestion</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsPanel;
