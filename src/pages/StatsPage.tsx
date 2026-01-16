import Navbar from "@/components/Navbar/Navbar";
import RightSidebar from "@/components/Navbar/RightSidebar";
import CountryMap from "@/components/Stats/CountryMap";
import TripsPerYearChart from "@/components/Stats/TripsPerYearChart";
import CountryRadarChart from "@/components/Stats/CountryRadarChart";

export default function StatsPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <RightSidebar />
      <div className="w-full">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
          {/* Map Section */}
          <div className="mb-8">
            <CountryMap />
          </div>

          {/* Additional Charts Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:justify-between w-full">
            <TripsPerYearChart />
            <CountryRadarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
