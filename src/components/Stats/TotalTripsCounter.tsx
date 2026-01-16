import React from "react";
import { useMarkers } from "@/hooks/useMarkers";
import CountUp from "@/components/ui/CountUp";
import { FaGlobeAmericas } from "react-icons/fa";

export default function TotalTripsCounter() {
  const { markers } = useMarkers();

  const totalTrips = markers.length;

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 p-5 sm:p-6 flex flex-col">
      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-auto">
        <FaGlobeAmericas size={24} className="text-stats-blue" />
        <span>Número de viajes</span>
      </h2>
      <div className="flex items-center justify-center flex-1">
        <CountUp
          to={totalTrips}
          duration={2}
          className="text-5xl sm:text-6xl font-bold text-stats-blue"
        />
      </div>
    </div>
  );
}
