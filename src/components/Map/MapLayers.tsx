import type { ReactElement } from "react";
import { TileLayer } from "react-leaflet";
import L from "leaflet";

type MapOption = 1 | 2 | 3 | 4;

interface TileConfig {
  url: string;
  attribution: string;
  maxZoom: number;
}

export const renderTileLayer = (mapOption: MapOption): ReactElement | null => {
  const tileLayerConfigs: Record<MapOption, TileConfig> = {
    1: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    },
    2: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 20,
    },
    3: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 20,
    },
    4: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "&copy; Esri",
      maxZoom: 19,
    },
  };

  const config = tileLayerConfigs[mapOption];

  if (!config) {
    return null;
  }

  const tileLayerOptions: L.TileLayerOptions = {
    attribution: config.attribution,
    maxZoom: config.maxZoom,
  };

  return <TileLayer url={config.url} {...tileLayerOptions} />;
};
