import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { FlightProvider } from './contexts/FlightContext';
import { BookingProvider } from './contexts/BookingContext';
import { theme } from './theme';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Flights } from './pages/Flights';
import { Bookings } from './pages/Bookings';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <FlightProvider>
                <BookingProvider>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                      <Route path="/flights" element={<PrivateRoute><Flights /></PrivateRoute>} />
                      <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
                      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </BookingProvider>
              </FlightProvider>
            </NotificationProvider>
          </AuthProvider>
        </CustomThemeProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
