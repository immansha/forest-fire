import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserStats {
  totalCO2Saved: number;
  totalEcoPoints: number;
  totalOrders: number;
  level: number;
  badges: string[];
}

interface UserContextType {
  isLoggedIn: boolean;
  userStats: UserStats;
  login: () => void;
  logout: () => void;
  updateStats: (co2: number, points: number) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalCO2Saved: 47.3,
    totalEcoPoints: 1250,
    totalOrders: 12,
    level: 3,
    badges: ['First Purchase', 'Eco Warrior', 'Carbon Saver']
  });

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const updateStats = (co2: number, points: number) => {
    setUserStats(prev => ({
      ...prev,
      totalCO2Saved: prev.totalCO2Saved + co2,
      totalEcoPoints: prev.totalEcoPoints + points,
      totalOrders: prev.totalOrders + 1,
      level: Math.floor((prev.totalEcoPoints + points) / 500) + 1
    }));
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userStats, login, logout, updateStats }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}