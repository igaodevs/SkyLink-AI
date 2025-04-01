import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import FlightMap from "@/components/dashboard/FlightMap";
import MetricsPanel from "@/components/dashboard/MetricsPanel";
import RecentFlights from "@/components/dashboard/RecentFlights";
import AlertsSection from "@/components/dashboard/AlertsSection";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Flight Map (spans 2 columns on large screens) */}
            <div className="lg:col-span-2 h-[500px]">
              <FlightMap />
            </div>

            {/* Metrics Panel */}
            <div className="h-[500px]">
              <MetricsPanel />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-3">
              <QuickActions />
            </div>

            {/* Recent Flights */}
            <div className="lg:col-span-2 h-[300px]">
              <RecentFlights />
            </div>

            {/* Alerts Section */}
            <div className="h-[300px]">
              <AlertsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
