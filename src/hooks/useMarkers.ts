import { useEffect } from "react";
import { useMarkersStore } from "../stores/MarkersStore";
import type {
  Marker,
  TripsPerYear,
  TripsPerYearByVisitor,
  VisitorFilter,
} from "../stores/MarkersStore";

interface UseMarkersReturn {
  markers: Marker[];
  filteredMarkers: Marker[];
  isLoading: boolean;
  error: string | null;
  uniqueCountries: string[];
  uniqueLCountries: string[];
  uniqueACountries: string[];
  visitorFilter: VisitorFilter;
  yearFilter: number | null;
  setFilteredMarkers: (filteredMarkers: Marker[]) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
  getTripsPerYear: () => TripsPerYear;
  getTripsPerYearByVisitor: () => TripsPerYearByVisitor;
  getTripsPerYearForCurrentVisitorFilter: () => TripsPerYear;
  filterByVisitor: (filter: VisitorFilter) => void;
  filterByYear: (year: number | null) => void;
  applyFilters: () => void;
}

export const useMarkers = (): UseMarkersReturn => {
  const {
    markers,
    filteredMarkers,
    isLoading,
    error,
    uniqueCountries,
    uniqueLCountries,
    uniqueACountries,
    visitorFilter,
    yearFilter,
    fetchMarkers,
    setFilteredMarkers,
    resetFilters,
    getTripsPerYear,
    getTripsPerYearByVisitor,
    getTripsPerYearForCurrentVisitorFilter,
    filterByVisitor,
    filterByYear,
    applyFilters,
  } = useMarkersStore();

  useEffect(() => {
    if (markers.length === 0) {
      fetchMarkers();
    }
  }, [markers.length, fetchMarkers]);

  return {
    markers,
    filteredMarkers,
    isLoading,
    error,
    uniqueCountries,
    uniqueLCountries,
    uniqueACountries,
    visitorFilter,
    yearFilter,
    setFilteredMarkers,
    resetFilters,
    refetch: fetchMarkers,
    getTripsPerYear,
    getTripsPerYearByVisitor,
    getTripsPerYearForCurrentVisitorFilter,
    filterByVisitor,
    filterByYear,
    applyFilters,
  };
};
