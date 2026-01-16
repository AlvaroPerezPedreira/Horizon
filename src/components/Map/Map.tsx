import { useState } from "react";
import { renderTileLayer } from "./MapLayers";
import { useMarkers } from "@/hooks/useMarkers";
import type { Marker as MarkerType } from "@/stores/MarkersStore";
import L from "leaflet";
import { MapContainer, Marker } from "react-leaflet";
import { getCustomIconByName } from "./MapIcons";
import "leaflet/dist/leaflet.css";
import GlassSurface from "../GlassSurface";
import MapPagination from "./MapPagination";
import MapFilter from "./MapFilter";
import MapItemDrawer from "./MapItemDrawer";
import MapFilterDrawer from "./MapFilterDrawer";

// @ts-expect-error - Leaflet private property
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type MapOption = 1 | 2 | 3 | 4;

export default function Map() {
  const [activeMarker, setActiveMarker] = useState<MarkerType | null>(null);
  const [mapOption, setMapOption] = useState<MapOption>(1);
  const { filteredMarkers, isLoading } = useMarkers();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handleMarkerClick = (marker: MarkerType): void => {
    setActiveMarker(marker);
  };

  const handleDrawerOpenChange = (open: boolean): void => {
    if (!open) {
      setActiveMarker(null);
    }
  };

  const handleFilterClick = (): void => {
    setIsFilterDrawerOpen(true);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{ position: "absolute", bottom: 100, left: 20, zIndex: 1000 }}
      >
        <GlassSurface
          width={64}
          height={64}
          borderRadius={9999}
          borderWidth={0.07}
          brightness={20}
          saturation={1.5}
          opacity={0.5}
          displace={0.5}
          blur={11}
          distortionScale={-180}
        >
          <MapFilter
            mapOption={mapOption}
            handleFilterClick={handleFilterClick}
          />
        </GlassSurface>
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 1000 }}>
        <GlassSurface
          width={300}
          height={64}
          borderRadius={9999}
          borderWidth={0.07}
          brightness={20}
          saturation={1.5}
          opacity={0.5}
          displace={0.5}
          blur={11}
          distortionScale={-180}
        >
          <MapPagination mapOption={mapOption} setMapOption={setMapOption} />
        </GlassSurface>
      </div>
      <div className="">
        <MapItemDrawer
          activeMarker={activeMarker}
          onOpenChange={handleDrawerOpenChange}
        />
      </div>
      <div className="">
        <MapFilterDrawer
          isOpen={isFilterDrawerOpen}
          onOpenFilterChange={setIsFilterDrawerOpen}
        />
      </div>
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <MapContainer
          center={[40.4168, -3.7038]}
          zoom={3}
          minZoom={4}
          maxZoom={18}
          worldCopyJump={true}
          maxBounds={[
            [-85, -Infinity],
            [85, Infinity],
          ]}
          maxBoundsViscosity={1.0}
          style={{ height: "100%", width: "100%" }}
        >
          {renderTileLayer(mapOption)}

          {!isLoading &&
            filteredMarkers.map((m) => (
              <Marker
                key={m.id}
                icon={getCustomIconByName(m.data?.visitor || "default")}
                position={[
                  Number(m.location?.lat) || 0,
                  Number(m.location?.lon) || 0,
                ]}
                eventHandlers={{
                  click: () => handleMarkerClick(m),
                }}
              />
            ))}
        </MapContainer>
      </div>
    </div>
  );
}
