export type FlightStatus = 'scheduled' | 'boarding' | 'departed' | 'in-air' | 'landed' | 'cancelled' | 'delayed';
export type FlightClass = 'economy' | 'business' | 'first';

export interface FlightCrew {
  captain: {
    id: string;
    name: string;
    experience: number;
  };
  firstOfficer: {
    id: string;
    name: string;
    experience: number;
  };
  cabinCrew: Array<{
    id: string;
    name: string;
    role: string;
  }>;
}

export interface FlightWeather {
  departure: {
    temperature: number;
    conditions: string;
    windSpeed: number;
    visibility: number;
  };
  arrival: {
    temperature: number;
    conditions: string;
    windSpeed: number;
    visibility: number;
  };
  enRoute: Array<{
    location: string;
    temperature: number;
    conditions: string;
    windSpeed: number;
  }>;
}

export interface FlightDelay {
  reason: string;
  duration: number;
  updatedAt: string;
}

export interface FlightNotification {
  id: string;
  type: 'delay' | 'cancellation' | 'gate-change' | 'boarding' | 'general';
  message: string;
  createdAt: string;
  read: boolean;
}

export interface FlightPricing {
  base: number;
  taxes: number;
  fees: number;
  currency: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  aircraft: {
    type: string;
    registration: string;
    capacity: {
      total: number;
      economy: number;
      business: number;
      first: number;
    };
  };
  origin: {
    code: string;
    city: string;
    terminal: string;
    gate: string;
  };
  destination: {
    code: string;
    city: string;
    terminal: string;
    gate: string;
  };
  departureDate: string;
  arrivalDate: string;
  duration: number;
  status: FlightStatus;
  crew: FlightCrew;
  weather: FlightWeather;
  delays: FlightDelay[];
  notifications: FlightNotification[];
  pricing: Record<FlightClass, FlightPricing>;
  availableSeats: Record<FlightClass, string[]>;
  amenities: {
    wifi: boolean;
    entertainment: boolean;
    meals: boolean;
    baggage: {
      checked: number;
      carryOn: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface FlightSearchParams {
  origin?: string;
  destination?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: {
    adults: number;
    children: number;
    infants: number;
  };
  class?: FlightClass;
  airline?: string;
  maxPrice?: number;
  directOnly?: boolean;
}

export interface FlightBookingParams {
  flightId: string;
  class: FlightClass;
  passengers: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber?: string;
    passportExpiry?: string;
    specialRequests?: string[];
  }>;
  seats: string[];
  specialRequests?: string[];
}

export interface FlightUpdateParams {
  status?: FlightStatus;
  crew?: FlightCrew;
  weather?: FlightWeather;
  delays?: FlightDelay[];
  notifications?: FlightNotification[];
  pricing?: Record<FlightClass, FlightPricing>;
  availableSeats?: Record<FlightClass, string[]>;
  amenities?: {
    wifi?: boolean;
    entertainment?: boolean;
    meals?: boolean;
    baggage?: {
      checked?: number;
      carryOn?: number;
    };
  };
}

export interface FlightSummary {
  totalFlights: number;
  flightsByStatus: Record<FlightStatus, number>;
  flightsByClass: Record<FlightClass, number>;
  recentFlights: Flight[];
  topRoutes: Array<{
    origin: string;
    destination: string;
    count: number;
  }>;
  delays: {
    total: number;
    averageDuration: number;
    byReason: Record<string, number>;
  };
} 