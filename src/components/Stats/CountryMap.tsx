import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMarkers } from "@/hooks/useMarkers";
import countryMappings from "../../utils/CountryMapUtils";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import CountryMapFilter from "./CountryMapFilter";
import CountryMapBarChart from "./CountryMapBarChart";
import TotalTripsCounter from "./TotalTripsCounter";

// Component to fix map sizing issues
function MapResizer() {
  const map = useMap();

  useEffect(() => {
    // Small delay to ensure container is fully rendered
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Handle window resize
    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
}

const countriesGeoJSON =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

interface CountryProperties {
  name?: string;
  [key: string]: any;
}

export default function CountryMap() {
  const [countries, setCountries] = useState<FeatureCollection<
    Geometry,
    CountryProperties
  > | null>(null);
  const [color, setColor] = useState<string>("#3b82f6");
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(
    new Set()
  );
  const { uniqueCountries } = useMarkers();

  useEffect(() => {
    fetch(countriesGeoJSON)
      .then((response) => response.json())
      .then((data: FeatureCollection<Geometry, CountryProperties>) => {
        setCountries(data);
        const countryNames = uniqueCountries
          .map((spanishName) => {
            const countryMapping = countryMappings[spanishName];
            return countryMapping ? countryMapping.name : spanishName;
          })
          .filter((name): name is string => Boolean(name));
        setSelectedCountries(new Set(countryNames));
      })
      .catch((error) => {
        console.error("Error loading countries data:", error);
      });
  }, [uniqueCountries]);

  const getCountryStyle = (feature?: Feature<Geometry, CountryProperties>) => {
    if (!feature) return {};

    const countryId = feature.properties?.name || (feature as any).id;
    const isSelected = selectedCountries.has(countryId);

    return {
      fillColor: isSelected ? color : "transparent",
      opacity: 0,
      color: "transparent",
      fillOpacity: isSelected ? 1 : 0,
    };
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* Side Panel: Filter + Chart */}
      <div className="w-full lg:w-[500px] xl:w-[550px] flex flex-col gap-6 shrink-0">
        {/* Top Row: Filter + Counter */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <CountryMapFilter
              setColor={setColor}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <TotalTripsCounter />
          </div>
        </div>
        <CountryMapBarChart />
      </div>

      {/* Map Container */}
      <div className="flex-1 min-h-[600px] lg:min-h-0">
        <div className="w-full h-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden">
          <MapContainer
            center={[20, 0]}
            zoom={1.8}
            minZoom={1}
            maxZoom={6}
            style={{ height: "100%", width: "100%" }}
            maxBounds={[
              [-65, -Infinity],
              [65, Infinity],
            ]}
            maxBoundsViscosity={1}
            worldCopyJump={true}
            inertia={false}
            dragging={false}
            zoomControl={false}
            scrollWheelZoom={false}
          >
            <MapResizer />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              minZoom={1}
              maxZoom={6}
              noWrap={false}
            />
            {countries && countries.features && (
              <GeoJSON data={countries} style={getCountryStyle} />
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
