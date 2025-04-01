import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  PlaneTakeoff,
  PlaneLanding,
  Luggage,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
} from "lucide-react";

interface QuickActionProps {
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }>;
}

const QuickActions = ({ actions }: QuickActionProps) => {
  const defaultActions = [
    {
      icon: <PlaneTakeoff className="h-5 w-5" />,
      label: "Schedule Flight",
      onClick: () => console.log("Schedule Flight clicked"),
      color: "text-blue-500",
    },
    {
      icon: <PlaneLanding className="h-5 w-5" />,
      label: "Manage Arrivals",
      onClick: () => console.log("Manage Arrivals clicked"),
      color: "text-green-500",
    },
    {
      icon: <Luggage className="h-5 w-5" />,
      label: "Baggage Tracking",
      onClick: () => console.log("Baggage Tracking clicked"),
      color: "text-amber-500",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "VIP Services",
      onClick: () => console.log("VIP Services clicked"),
      color: "text-purple-500",
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: "View Alerts",
      onClick: () => console.log("View Alerts clicked"),
      color: "text-red-500",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Analytics",
      onClick: () => console.log("Analytics clicked"),
      color: "text-indigo-500",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      onClick: () => console.log("Settings clicked"),
      color: "text-gray-500",
    },
  ];

  const displayActions = actions || defaultActions;

  return (
    <Card className="w-full p-4 bg-white shadow-sm">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            {displayActions.map((action, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border hover:bg-gray-50"
                    onClick={action.onClick}
                  >
                    <span className={action.color}>{action.icon}</span>
                    <span>{action.label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
