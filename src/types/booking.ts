import { Flight } from './flight';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  specialRequests?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  flight: Flight;
  passengers: Passenger[];
  class: 'economy' | 'business' | 'first';
  seats: string[];
  specialRequests?: string[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  paymentDetails?: {
    method: string;
    transactionId?: string;
    paidAt?: string;
  };
  cancellationDetails?: {
    reason?: string;
    cancelledAt: string;
    refundAmount?: number;
    refundStatus?: 'pending' | 'completed' | 'failed';
  };
}

export interface BookingSearchParams {
  userId?: string;
  flightId?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  class?: 'economy' | 'business' | 'first';
}

export interface BookingUpdateParams {
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  specialRequests?: string[];
  seats?: string[];
  passengers?: Passenger[];
  paymentDetails?: {
    method: string;
    transactionId?: string;
    paidAt?: string;
  };
  cancellationDetails?: {
    reason?: string;
    cancelledAt: string;
    refundAmount?: number;
    refundStatus?: 'pending' | 'completed' | 'failed';
  };
}

export interface BookingSummary {
  totalBookings: number;
  totalRevenue: number;
  bookingsByStatus: Record<BookingStatus, number>;
  bookingsByClass: Record<'economy' | 'business' | 'first', number>;
  recentBookings: Booking[];
  topRoutes: Array<{
    origin: string;
    destination: string;
    count: number;
  }>;
} 