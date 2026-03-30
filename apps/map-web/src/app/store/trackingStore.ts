import { create } from 'zustand';

export interface TrackingPointData {
  latitude: number;
  longitude: number;
  timestamp: string;
  providerId: string;
  rawSource: string;
  accuracy?: number;
  speed?: number;
}

export interface RouteData {
  type: string;
  coordinates: number[][];
}

export interface TrackingState {
  searchType: 'patent' | 'rut';
  searchQuery: string;
  points: TrackingPointData[];
  route: RouteData | null;
  loading: boolean;
  error: string | null;

  setSearchType: (type: 'patent' | 'rut') => void;
  setSearchQuery: (query: string) => void;
  setPoints: (points: TrackingPointData[]) => void;
  setRoute: (route: RouteData | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  searchType: 'patent',
  searchQuery: '',
  points: [],
  route: null,
  loading: false,
  error: null,

  setSearchType: (type) => set({ searchType: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPoints: (points) => set({ points }),
  setRoute: (route) => set({ route }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      searchQuery: '',
      points: [],
      route: null,
      loading: false,
      error: null,
    }),
}));
