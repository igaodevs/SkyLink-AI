import { Suspense, lazy, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const WelcomeScreen = lazy(() => import("./components/WelcomeScreen"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Flights = lazy(() => import("./views/Flights"));
const DynamicBooking = lazy(() => import("./views/DynamicBooking"));
const VIPPlatform = lazy(() => import("./views/VIPPlatform"));
const BaggageTracker = lazy(() => import("./views/BaggageTracker"));
const Training = lazy(() => import("./views/Training"));
const Authentication = lazy(() => import("./views/Authentication"));

function App() {
  // Define Tempo routes first
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  // State to track if welcome screen has been shown
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const welcomeSeen = localStorage.getItem("hasSeenWelcome");
    setHasSeenWelcome(welcomeSeen === "true");
  }, []);

  // Function to mark welcome screen as seen
  const markWelcomeAsSeen = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setHasSeenWelcome(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }
        >
          <>
            {/* Render Tempo routes first if they exist */}
            {tempoRoutes}

            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/booking" element={<DynamicBooking />} />
              <Route path="/vip" element={<VIPPlatform />} />
              <Route path="/baggage" element={<BaggageTracker />} />
              <Route path="/training" element={<Training />} />

              {/* Authentication routes */}
              <Route path="/login" element={<Authentication />} />
              <Route path="/register" element={<Authentication />} />
              <Route path="/forgot-password" element={<Authentication />} />

              {/* Add Tempo routes path before the catch-all */}
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
          </>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
