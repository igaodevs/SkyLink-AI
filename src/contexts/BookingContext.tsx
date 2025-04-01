import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingSearchParams, BookingUpdateParams } from '../types/booking';
import { bookingService } from '../services/booking.service';
import { useNotification } from './NotificationContext';

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  searchBookings: (params: BookingSearchParams) => Promise<void>;
  getBookingById: (id: string) => Promise<Booking | null>;
  updateBooking: (id: string, params: BookingUpdateParams) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: React.ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showError, showSuccess } = useNotification();

  const searchBookings = async (params: BookingSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const results = await bookingService.searchBookings(params);
      setBookings(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search bookings';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getBookingById = async (id: string): Promise<Booking | null> => {
    try {
      setLoading(true);
      setError(null);
      const booking = await bookingService.getBookingById(id);
      return booking;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get booking details';
      setError(errorMessage);
      showError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: string, params: BookingUpdateParams) => {
    try {
      setLoading(true);
      setError(null);
      await bookingService.updateBooking(id, params);
      showSuccess('Booking updated successfully');
      await refreshBookings();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update booking';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await bookingService.cancelBooking(id);
      showSuccess('Booking cancelled successfully');
      await refreshBookings();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel booking';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refreshBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const updatedBookings = await bookingService.getAllBookings();
      setBookings(updatedBookings);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh bookings';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        searchBookings,
        getBookingById,
        updateBooking,
        cancelBooking,
        refreshBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}; 