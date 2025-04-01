import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Flight, FlightSearchParams, FlightUpdateParams } from '../types/flight';
import { authService } from './auth.service';

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    terminal: string;
    scheduledTime: Date;
    actualTime?: Date;
  };
  arrival: {
    airport: string;
    terminal: string;
    scheduledTime: Date;
    actualTime?: Date;
  };
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled';
  aircraft: {
    type: string;
    registration: string;
  };
  crew: {
    captain: string;
    firstOfficer: string;
    cabinCrew: string[];
  };
  passengers: {
    total: number;
    checkedIn: number;
    boarded: number;
  };
  weather: {
    departure: {
      conditions: string;
      temperature: number;
      windSpeed: number;
    };
    arrival: {
      conditions: string;
      temperature: number;
      windSpeed: number;
    };
  };
  delays: {
    reason?: string;
    duration?: number;
    updatedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

class FlightService {
  private collection = collection(db, 'flights');

  async createFlight(flightData: Omit<Flight, 'id' | 'createdAt' | 'updatedAt'>): Promise<Flight> {
    const flight = {
      ...flightData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(this.collection, flight);
    return {
      id: docRef.id,
      ...flight,
      createdAt: flight.createdAt.toDate().toISOString(),
      updatedAt: flight.updatedAt.toDate().toISOString()
    };
  }

  async getFlightById(id: string): Promise<Flight | null> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt.toDate().toISOString(),
      updatedAt: data.updatedAt.toDate().toISOString()
    } as Flight;
  }

  async searchFlights(params: FlightSearchParams): Promise<Flight[]> {
    const q = query(
      this.collection,
      where('departure.airport', '==', params.departureAirport),
      where('arrival.airport', '==', params.arrivalAirport),
      where('departure.scheduledTime', '>=', params.departureDate),
      where('departure.scheduledTime', '<=', new Date(new Date(params.departureDate).setDate(new Date(params.departureDate).getDate() + 1)).toISOString())
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt.toDate().toISOString()
    })) as Flight[];
  }

  async updateFlight(id: string, params: FlightUpdateParams): Promise<void> {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, {
      ...params,
      updatedAt: Timestamp.now()
    });
  }

  async deleteFlight(id: string): Promise<void> {
    const docRef = doc(this.collection, id);
    await deleteDoc(docRef);
  }

  subscribeToFlights(callback: (flights: Flight[]) => void) {
    return onSnapshot(this.collection, (snapshot) => {
      const flights = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate().toISOString(),
        updatedAt: doc.data().updatedAt.toDate().toISOString()
      })) as Flight[];
      callback(flights);
    });
  }

  subscribeToFlight(id: string, callback: (flight: Flight | null) => void) {
    const docRef = doc(this.collection, id);
    return onSnapshot(docRef, (doc) => {
      if (!doc.exists()) {
        callback(null);
        return;
      }
      const data = doc.data();
      callback({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString()
      } as Flight);
    });
  }

  public async getFlights(filters: {
    airline?: string;
    status?: Flight['status'];
    departureAirport?: string;
    arrivalAirport?: string;
    date?: Date;
  } = {}): Promise<Flight[]> {
    const flightsRef = collection(this.collection);
    let q = query(flightsRef);

    if (filters.airline) {
      q = query(q, where('airline', '==', filters.airline));
    }

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters.departureAirport) {
      q = query(q, where('departure.airport', '==', filters.departureAirport));
    }

    if (filters.arrivalAirport) {
      q = query(q, where('arrival.airport', '==', filters.arrivalAirport));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      departure: {
        ...doc.data().departure,
        scheduledTime: doc.data().departure.scheduledTime.toDate(),
        actualTime: doc.data().departure.actualTime?.toDate()
      },
      arrival: {
        ...doc.data().arrival,
        scheduledTime: doc.data().arrival.scheduledTime.toDate(),
        actualTime: doc.data().arrival.actualTime?.toDate()
      },
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Flight[];
  }

  public async updateFlightStatus(id: string, status: Flight['status'], delayReason?: string): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airlines can update flight status');
    }

    const flightRef = doc(this.collection, id);
    const updates: any = {
      status,
      updatedAt: Timestamp.now()
    };

    if (status === 'delayed' && delayReason) {
      updates.delays = {
        reason: delayReason,
        updatedAt: Timestamp.now()
      };
    }

    await updateDoc(flightRef, updates);
  }

  public async optimizeRoute(flightId: string): Promise<{
    suggestedRoute: string;
    estimatedSavings: number;
    reasons: string[];
  }> {
    // This is a placeholder for the AI-powered route optimization
    // In a real implementation, this would use machine learning models
    // to analyze historical data, weather patterns, and other factors
    return {
      suggestedRoute: 'Optimized route would be calculated here',
      estimatedSavings: 0,
      reasons: ['Route optimization would be implemented here']
    };
  }
}

export const flightService = new FlightService(); 