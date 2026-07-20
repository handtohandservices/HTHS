'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { api, tokenStorage } from '@/lib/api';

type AdminUser = { admin_id: string; email: string } | null;

type AuthContextType = {
  user: AdminUser;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser>(null);
  const [loading, setLoading] = useState(true);

  // On mount, if we have a stored token, verify it with the backend.
  const verifyStoredSession = useCallback(async () => {
    const token = tokenStorage.get();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await api.me();
      setUser({ admin_id: me.admin_id, email: me.email });
    } catch {
      tokenStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyStoredSession();
  }, [verifyStoredSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const session = await api.signIn(email, password);
    tokenStorage.set(session.token, session.email);
    setUser({ admin_id: session.admin_id, email: session.email });
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const session = await api.signUp(email, password);
    tokenStorage.set(session.token, session.email);
    setUser({ admin_id: session.admin_id, email: session.email });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api.signOut();
    } catch {
      // ignore — clearing locally is what matters
    }
    tokenStorage.clear();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
