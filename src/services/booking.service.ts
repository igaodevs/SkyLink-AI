import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FlightBookingParams, Flight } from '../types/flight';
import { authService } from './auth.service';
import { flightService } from './flight.service';

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  flight: Flight;
  passengers: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    passportExpiry: string;
  }[];
  class: 'economy' | 'business' | 'first';
  seats: string[];
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

class BookingService {
  private collection = collection(db, 'bookings');

  async createBooking(params: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const bookingData = {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(this.collection, bookingData);
    return {
      id: docRef.id,
      ...bookingData,
      createdAt: bookingData.createdAt.toDate().toISOString(),
      updatedAt: bookingData.updatedAt.toDate().toISOString()
    };
  }

  async getBooking(id: string): Promise<Booking | null> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString()
    } as Booking;
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    const q = query(this.collection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString()
    })) as Booking[];
  }

  async updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now()
    });
  }

  async updatePaymentStatus(id: string, status: Booking['paymentStatus']): Promise<void> {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, {
      paymentStatus: status,
      updatedAt: Timestamp.now()
    });
  }

  async cancelBooking(id: string): Promise<void> {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, {
      status: 'cancelled',
      updatedAt: Timestamp.now()
    });
  }

  subscribeToUserBookings(userId: string, callback: (bookings: Booking[]) => void) {
    const q = query(this.collection, where('userId', '==', userId));
    return onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toISOString(),
        updatedAt: doc.data().updatedAt.toDate().toISOString()
      })) as Booking[];
      callback(bookings);
    });
  }

  public async suggestAlternativeFlights(bookingId: string): Promise<any[]> {
    const booking = await this.getBooking(bookingId);
    if (!booking) throw new Error('Booking not found');

    const flight = await flightService.getFlightById(booking.flightId);
    if (!flight) throw new Error('Flight not found');

    // This is a placeholder for AI-powered flight suggestions
    // In a real implementation, this would:
    // 1. Analyze user preferences
    // 2. Consider price sensitivity
    // 3. Factor in travel time preferences
    // 4. Look at historical booking patterns
    return [];
  }
}

export const bookingService = new BookingService(); 