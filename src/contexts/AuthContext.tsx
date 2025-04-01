import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChange, getCurrentUser } from "@/services/auth";
import { firestore } from "@/services/firebase";
import { authService } from '../services/auth.service';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Define user roles
export type UserRole = "admin" | "airline_staff" | "passenger" | "guest";

// Extended user type with role and other custom fields
export interface ExtendedUser extends User {
  role?: UserRole;
  companyId?: string;
  preferences?: Record<string, any>;
  lastLogin?: Date;
}

interface AuthContextType {
  currentUser: ExtendedUser | null;
  userLoading: boolean;
  userRole: UserRole;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  refreshUserData: () => Promise<void>;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("guest");
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from Firestore
  const fetchUserData = async (user: User): Promise<ExtendedUser> => {
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        return { ...user, ...userData } as ExtendedUser;
      } else {
        // Create user document if it doesn't exist
        const newUserData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: "passenger", // Default role
          createdAt: new Date(),
          lastLogin: new Date(),
        };
        await setDoc(userDocRef, newUserData);
        return { ...user, ...newUserData } as ExtendedUser;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return user as ExtendedUser;
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    const user = getCurrentUser();
    if (user) {
      const extendedUser = await fetchUserData(user);
      setCurrentUser(extendedUser);
      setUserRole(extendedUser.role || "guest");
    }
  };

  // Check if user has required role
  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!currentUser) return false;

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }

    return userRole === requiredRole || userRole === "admin";
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUserLoading(true);

      if (user) {
        const extendedUser = await fetchUserData(user);
        setCurrentUser(extendedUser);
        setUserRole(extendedUser.role || "guest");
      } else {
        setCurrentUser(null);
        setUserRole("guest");
      }

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to logout');
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
      throw err;
    }
  };

  const updateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    try {
      await authService.updateProfile(data);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const updateUserProfile = async (displayName: string) => {
    if (!user) throw new Error('No user logged in');

    try {
      setError(null);
      await updateProfile(user, { displayName });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const value = {
    currentUser,
    userLoading,
    userRole,
    isAuthenticated: !!currentUser,
    hasPermission,
    refreshUserData,
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
