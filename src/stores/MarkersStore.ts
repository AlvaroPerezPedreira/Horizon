import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export interface DateInfo {
  year: number;
  month: number;
  startDate: string;
  endDate: string;
}

export interface FirestoreReference {
  type: "firestore/documentReference/1.0";
  referencePath: string;
}

export interface Location {
  lon: number;
  lat: number;
  country: string;
  state: string;
}

export interface MarkerData {
  visitor?: string;
  description?: string;
  visitors?: (string | FirestoreReference)[];
  date?: DateInfo;
}

export interface Marker {
  id: string;
  title: string;
  imageUrl: string;
  location?: Location;
  data?: MarkerData;
}

export interface TripsPerYear {
  [year: number]: number;
}

export interface TripsPerYearByVisitor {
  total: TripsPerYear;
  lara: TripsPerYear;
  alvaro: TripsPerYear;
}

export type VisitorFilter = "all" | "lara" | "alvaro" | "both";

interface MarkersStore {
  markers: Marker[];
  filteredMarkers: Marker[];
  isLoading: boolean;
  error: string | null;
  uniqueCountries: string[];
  uniqueLCountries: string[];
  uniqueACountries: string[];
  visitorFilter: VisitorFilter;
  yearFilter: number | null;
  fetchMarkers: () => Promise<void>;
  setFilteredMarkers: (filteredMarkers: Marker[]) => void;
  resetFilters: () => void;
  getUniqueCountries: () => string[];
  extractUniqueCountries: () => string[];
  getTripsPerYear: () => TripsPerYear;
  getTripsPerYearByVisitor: () => TripsPerYearByVisitor;
  filterByVisitor: (filter: VisitorFilter) => void;
  filterByYear: (year: number | null) => void;
  applyFilters: () => void;
  getTripsPerYearForCurrentVisitorFilter: () => TripsPerYear;
}

export const useMarkersStore = create<MarkersStore>((set, get) => ({
  markers: [],
  filteredMarkers: [],
  isLoading: false,
  error: null,
  uniqueCountries: [],
  uniqueLCountries: [],
  uniqueACountries: [],
  visitorFilter: "all",
  yearFilter: null,

  // Fetch markers from Firebase
  fetchMarkers: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "markers"));
      const markersData: Marker[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          imageUrl: data.imageUrl || "",
          location: data.location,
          data: data.data,
        } as Marker;
      });

      const countriesSet = new Set<string>();
      const l_CountriesSet = new Set<string>();
      const a_CountriesSet = new Set<string>();

      markersData.forEach((marker) => {
        if (marker.location && marker.location.country) {
          const country = marker.location.country;

          countriesSet.add(country);

          if (marker.data && marker.data.visitor) {
            if (marker.data.visitor === "Lara") {
              l_CountriesSet.add(country);
            } else if (marker.data.visitor === "Álvaro") {
              a_CountriesSet.add(country);
            }
          }

          if (marker.data && Array.isArray(marker.data.visitors)) {
            if (marker.data.visitors.includes("Lara")) {
              l_CountriesSet.add(country);
            }
            if (marker.data.visitors.includes("Álvaro")) {
              a_CountriesSet.add(country);
            }
          }
        }
      });

      const uniqueCountriesArray = Array.from(countriesSet).sort();
      const uniqueLCountriesArray = Array.from(l_CountriesSet).sort();
      const uniqueACountriesArray = Array.from(a_CountriesSet).sort();

      set({
        markers: markersData,
        filteredMarkers: markersData,
        uniqueCountries: uniqueCountriesArray,
        uniqueLCountries: uniqueLCountriesArray,
        uniqueACountries: uniqueACountriesArray,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      set({ error: errorMessage, isLoading: false });
      console.error("Error fetching markers:", error);
    }
  },

  // Set filtered markers
  setFilteredMarkers: (filteredMarkers: Marker[]) => set({ filteredMarkers }),

  // Reset filters
  resetFilters: () => {
    set({ visitorFilter: "all", yearFilter: null });
    get().applyFilters();
  },

  filterByVisitor: (filter: VisitorFilter) => {
    set({ visitorFilter: filter });
    get().applyFilters();
  },

  filterByYear: (year: number | null) => {
    set({ yearFilter: year });
    get().applyFilters();
  },

  applyFilters: () => {
    const state = get();
    let filtered = [...state.markers];

    // Aplicar filtro de visitante
    if (state.visitorFilter !== "all") {
      filtered = filtered.filter((marker) => {
        if (!marker.data) return false;

        const visitor = marker.data.visitor;
        const visitors = marker.data.visitors || [];

        const hasVisitor = (name: string) => {
          if (visitor === name) return true;
          return visitors.some((v) =>
            typeof v === "string" ? v === name : false
          );
        };

        switch (state.visitorFilter) {
          case "lara":
            return hasVisitor("Lara");
          case "alvaro":
            return hasVisitor("Álvaro");
          case "both":
            return hasVisitor("Lara") && hasVisitor("Álvaro");
          default:
            return true;
        }
      });
    }

    // Aplicar filtro de año
    if (state.yearFilter !== null) {
      filtered = filtered.filter((marker) => {
        return (
          marker.data &&
          marker.data.date &&
          marker.data.date.year === state.yearFilter
        );
      });
    }

    set({ filteredMarkers: filtered });
  },

  getTripsPerYearForCurrentVisitorFilter: (): TripsPerYear => {
    const state = get();
    const tripsPerYear: TripsPerYear = {};

    // Primero aplicar el filtro de visitante
    let filteredByVisitor = [...state.markers];

    if (state.visitorFilter !== "all") {
      filteredByVisitor = filteredByVisitor.filter((marker) => {
        if (!marker.data) return false;

        const visitor = marker.data.visitor;
        const visitors = marker.data.visitors || [];

        const hasVisitor = (name: string) => {
          if (visitor === name) return true;
          return visitors.some((v) =>
            typeof v === "string" ? v === name : false
          );
        };

        switch (state.visitorFilter) {
          case "lara":
            return hasVisitor("Lara");
          case "alvaro":
            return hasVisitor("Álvaro");
          case "both":
            return hasVisitor("Lara") && hasVisitor("Álvaro");
          default:
            return true;
        }
      });
    }

    // Luego contar por año
    filteredByVisitor.forEach((marker) => {
      if (marker.data && marker.data.date && marker.data.date.year) {
        const year = marker.data.date.year;

        if (!isNaN(year) && year !== null && year !== undefined) {
          tripsPerYear[year] = (tripsPerYear[year] || 0) + 1;
        }
      }
    });

    return Object.keys(tripsPerYear)
      .sort((a, b) => Number(b) - Number(a))
      .reduce((acc: TripsPerYear, year) => {
        acc[Number(year)] = tripsPerYear[Number(year)];
        return acc;
      }, {});
  },

  getUniqueCountries: () => {
    const state = get();
    return state.uniqueCountries;
  },

  extractUniqueCountries: () => {
    const state = get();
    const countriesSet = new Set<string>();

    state.markers.forEach((marker) => {
      if (marker.location && marker.location.country) {
        countriesSet.add(marker.location.country);
      }
    });

    return Array.from(countriesSet).sort();
  },

  getTripsPerYear: (): TripsPerYear => {
    const state = get();
    const tripsPerYear: TripsPerYear = {};

    state.markers.forEach((marker) => {
      if (marker.data && marker.data.date && marker.data.date.year) {
        const year = marker.data.date.year;

        if (!isNaN(year) && year !== null && year !== undefined) {
          if (tripsPerYear[year]) {
            tripsPerYear[year]++;
          } else {
            tripsPerYear[year] = 1;
          }
        }
      }
    });

    return Object.keys(tripsPerYear)
      .sort((a, b) => Number(a) - Number(b))
      .reduce((acc: TripsPerYear, year) => {
        acc[Number(year)] = tripsPerYear[Number(year)];
        return acc;
      }, {});
  },

  getTripsPerYearByVisitor: (): TripsPerYearByVisitor => {
    const state = get();
    const tripsPerYear: TripsPerYearByVisitor = {
      total: {},
      lara: {},
      alvaro: {},
    };

    state.markers.forEach((marker) => {
      if (marker.data && marker.data.date && marker.data.date.year) {
        const year = marker.data.date.year;

        if (!isNaN(year) && year !== null && year !== undefined) {
          tripsPerYear.total[year] = (tripsPerYear.total[year] || 0) + 1;

          if (marker.data.visitor) {
            if (marker.data.visitor === "Lara") {
              tripsPerYear.lara[year] = (tripsPerYear.lara[year] || 0) + 1;
            } else if (marker.data.visitor === "Álvaro") {
              tripsPerYear.alvaro[year] = (tripsPerYear.alvaro[year] || 0) + 1;
            }
          }
        }
      }
    });

    return tripsPerYear;
  },
}));
