"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

// Types for recently viewed products
interface RecentProduct {
  id: string;
  title: string;
  brand: string;
  image: string;
  viewedAt: number;
}

interface NavigationContextType {
  // Recently viewed products
  recentlyViewed: RecentProduct[];
  addToRecentlyViewed: (product: RecentProduct) => void;
  clearRecentlyViewed: () => void;

  // Search history
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

const STORAGE_KEYS = {
  RECENTLY_VIEWED: "forges-recently-viewed",
  SEARCH_HISTORY: "forges-search-history",
};

const MAX_RECENT_PRODUCTS = 6;
const MAX_SEARCH_HISTORY = 5;

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentProduct[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      // Load recently viewed products
      const savedRecent = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      if (savedRecent) {
        const parsed = JSON.parse(savedRecent);
        if (Array.isArray(parsed)) {
          setRecentlyViewed(parsed);
        }
      }

      // Load search history
      const savedHistory = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setSearchHistory(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading navigation data from localStorage:", error);
    }
    setMounted(true);
  }, []);

  // Add product to recently viewed
  const addToRecentlyViewed = useCallback((product: RecentProduct) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.id !== product.id);
      // Add to front with current timestamp
      const updated = [{ ...product, viewedAt: Date.now() }, ...filtered].slice(
        0,
        MAX_RECENT_PRODUCTS
      );

      // Save to localStorage
      try {
        localStorage.setItem(
          STORAGE_KEYS.RECENTLY_VIEWED,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error("Error saving recently viewed:", error);
      }

      return updated;
    });
  }, []);

  // Clear recently viewed
  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
    } catch (error) {
      console.error("Error clearing recently viewed:", error);
    }
  }, []);

  // Add to search history
  const addToSearchHistory = useCallback((query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setSearchHistory((prev) => {
      // Remove if already exists (case insensitive)
      const filtered = prev.filter(
        (q) => q.toLowerCase() !== trimmedQuery.toLowerCase()
      );
      // Add to front
      const updated = [trimmedQuery, ...filtered].slice(0, MAX_SEARCH_HISTORY);

      // Save to localStorage
      try {
        localStorage.setItem(
          STORAGE_KEYS.SEARCH_HISTORY,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error("Error saving search history:", error);
      }

      return updated;
    });
  }, []);

  // Clear search history
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error("Error clearing search history:", error);
    }
  }, []);

  // Avoid hydration issues
  if (!mounted) {
    return (
      <NavigationContext.Provider
        value={{
          recentlyViewed: [],
          addToRecentlyViewed,
          clearRecentlyViewed,
          searchHistory: [],
          addToSearchHistory,
          clearSearchHistory,
        }}
      >
        {children}
      </NavigationContext.Provider>
    );
  }

  return (
    <NavigationContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
        searchHistory,
        addToSearchHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
