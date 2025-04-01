import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChange, getCurrentUser } from "@/services/auth";
import { firestore } from "@/services/firebase";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ExtendedUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("guest");
  const [userLoading, setUserLoading] = useState(true);

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

  const value = {
    currentUser,
    userLoading,
    userRole,
    isAuthenticated: !!currentUser,
    hasPermission,
    refreshUserData,
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
