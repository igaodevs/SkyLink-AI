import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  ExternalLink,
  X,
} from "lucide-react";

type AlertSeverity = "critical" | "warning" | "info" | "success";

interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: AlertSeverity;
  isRead: boolean;
}

interface AlertsSectionProps {
  alerts?: Alert[];
  onDismissAlert?: (id: string) => void;
  onViewAlertDetails?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

const getSeverityIcon = (severity: AlertSeverity) => {
  switch (severity) {
    case "critical":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "info":
      return <Bell className="h-5 w-5 text-blue-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
};

const getSeverityBadge = (severity: AlertSeverity) => {
  switch (severity) {
    case "critical":
      return <Badge variant="destructive">Critical</Badge>;
    case "warning":
      return (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 border-amber-300"
        >
          Warning
        </Badge>
      );
    case "info":
      return (
        <Badge
          variant="outline"
          className="bg-blue-100 text-blue-800 border-blue-300"
        >
          Info
        </Badge>
      );
    case "success":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 border-green-300"
        >
          Success
        </Badge>
      );
  }
};

const AlertsSection: React.FC<AlertsSectionProps> = ({
  alerts = [
    {
      id: "1",
      title: "Weather Alert",
      message:
        "Severe thunderstorms expected along flight path AX-2234. Rerouting recommended.",
      timestamp: "2023-06-15T14:30:00Z",
      severity: "critical",
      isRead: false,
    },
    {
      id: "2",
      title: "Maintenance Required",
      message:
        "Aircraft B737-800 (Reg: N12345) requires immediate inspection before next flight.",
      timestamp: "2023-06-15T13:45:00Z",
      severity: "warning",
      isRead: false,
    },
    {
      id: "3",
      title: "Baggage System Status",
      message:
        "Terminal 2 baggage system operating at reduced capacity. Expect delays of 15-20 minutes.",
      timestamp: "2023-06-15T12:15:00Z",
      severity: "info",
      isRead: true,
    },
    {
      id: "4",
      title: "Flight Crew Update",
      message:
        "All flight crew certifications have been successfully updated in the system.",
      timestamp: "2023-06-15T10:00:00Z",
      severity: "success",
      isRead: true,
    },
  ],
  onDismissAlert = (id) => console.log(`Dismiss alert ${id}`),
  onViewAlertDetails = (id) => console.log(`View alert details ${id}`),
  onMarkAllAsRead = () => console.log("Mark all alerts as read"),
}) => {
  // Count unread alerts
  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Critical Alerts</CardTitle>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {unreadCount} unread
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-sm"
          >
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border flex items-start gap-3 ${!alert.isRead ? "bg-slate-50 border-slate-200" : "bg-white border-slate-100"}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(alert.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {alert.message}
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => onDismissAlert(alert.id)}
                      >
                        <X className="h-3.5 w-3.5 mr-1" />
                        Dismiss
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => onViewAlertDetails(alert.id)}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-slate-500">
                <CheckCircle className="h-10 w-10 mb-2 text-green-500" />
                <p>No active alerts at this time</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertsSection;
