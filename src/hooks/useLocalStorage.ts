import { User } from "@/types";
import { useState, useEffect } from "react";

type SetValue<T> = T | ((val: T) => T);

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: SetValue<T>) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(
            `Error parsing localStorage value for key "${key}":`,
            error
          );
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
}

// Specialized hooks using useLocalStorage
export const useAuthToken = () => {
  return useLocalStorage<string | null>("auth-token", null);
};

export const useAuthUser = () => {
  return useLocalStorage<User | null>("auth-user", null);
};

export const useTheme = () => {
  return useLocalStorage<"light" | "dark">("theme", "light");
};

export const useSidebarCollapsed = () => {
  return useLocalStorage<boolean>("sidebar-collapsed", false);
};

// Hook for managing user preferences
export const useUserPreferences = () => {
  const [preferences, setPreferences, removePreferences] = useLocalStorage(
    "user-preferences",
    {
      theme: "light" as "light" | "dark",
      sidebarCollapsed: false,
      language: "en",
      timezone: "UTC",
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
    }
  );

  const updatePreference = <K extends keyof typeof preferences>(
    key: K,
    value: (typeof preferences)[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    removePreferences();
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
    setPreferences,
  };
};
