"use client";

import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export function UserProvider({ children, initialUser = null }) {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
console.log(user)
  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/account", {
        method: "GET",
        credentials: "include", // client-side: send cookies if possible
        cache: "no-store",
      });
      const data = await res.json();
      setUser(data.authenticated ? data.customer : null);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}
