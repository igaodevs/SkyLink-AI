import React, { createContext, useContext, useState, useEffect } from 'react';
import { Flight, FlightSearchParams, FlightBookingParams } from '../types/flight';
import { flightService } from '../services/flight.service';
import { useNotification } from './NotificationContext';

interface FlightContextType {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  searchFlights: (params: FlightSearchParams) => Promise<void>;
  bookFlight: (params: FlightBookingParams) => Promise<void>;
  getFlightById: (id: string) => Promise<Flight | null>;
  updateFlightStatus: (id: string, status: string) => Promise<void>;
  refreshFlights: () => Promise<void>;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
};

interface FlightProviderProps {
  children: React.ReactNode;
}

export const FlightProvider: React.FC<FlightProviderProps> = ({ children }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError, showSuccess } = useNotification();

  const searchFlights = async (params: FlightSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const results = await flightService.searchFlights(params);
      setFlights(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search flights';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const bookFlight = async (params: FlightBookingParams) => {
    try {
      setLoading(true);
      setError(null);
      await flightService.bookFlight(params);
      showSuccess('Flight booked successfully');
      await refreshFlights();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to book flight';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getFlightById = async (id: string): Promise<Flight | null> => {
    try {
      setLoading(true);
      setError(null);
      const flight = await flightService.getFlightById(id);
      return flight;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get flight details';
      setError(errorMessage);
      showError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateFlightStatus = async (id: string, status: string) => {
    try {
      setLoading(true);
      setError(null);
      await flightService.updateFlightStatus(id, status);
      showSuccess('Flight status updated successfully');
      await refreshFlights();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update flight status';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const updatedFlights = await flightService.getAllFlights();
      setFlights(updatedFlights);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh flights';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFlights();
  }, []);

  return (
    <FlightContext.Provider
      value={{
        flights,
        loading,
        error,
        searchFlights,
        bookFlight,
        getFlightById,
        updateFlightStatus,
        refreshFlights,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
}; 