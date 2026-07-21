import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../../../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadSubscription(userId) {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Failed to load subscription:", error);
      setSubscription(null);
      return;
    }

    setSubscription(data);
  }

  useEffect(() => {
    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        await loadSubscription(currentUser.id);
      } else {
        setSubscription(null);
      }

      setLoading(false);
    }

    initializeAuth();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser) {
          await loadSubscription(currentUser.id);
        } else {
          setSubscription(null);
        }

        setLoading(false);
      }
    );

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  const hasActiveSubscription =
    subscription?.status === "active" ||
    subscription?.status === "trialing";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        subscription,
        hasActiveSubscription,
        refreshSubscription: () =>
          user ? loadSubscription(user.id) : null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}