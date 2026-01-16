import Map from "@/components/Map/Map";
import Navbar from "@/components/Navbar/Navbar";
import RightSidebar from "@/components/Navbar/RightSidebar";
import { useMarkersStore } from "@/stores/MarkersStore";
import { useEffect } from "react";

export default function MapPage() {
  const { markers, fetchMarkers } = useMarkersStore();

  useEffect(() => {
    if (markers.length === 0) {
      fetchMarkers();
    }
  }, [markers.length, fetchMarkers]);

  return (
    <>
      <Navbar />
      <RightSidebar />
      <Map />
    </>
  );
}
