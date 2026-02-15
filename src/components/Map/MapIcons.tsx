import L from "leaflet";
import type { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

export const customDefaultIcon: DivIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="blue" />,
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const customPinkIcon: DivIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="#E91E63" />,
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const customGreenIcon: DivIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="#2ECC71" />,
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

type VisitorName = "Álvaro" | "Lara";

export const getCustomIconByName = (name: VisitorName | string): DivIcon => {
  switch (name) {
    case "Álvaro":
      return customGreenIcon;
    case "Lara":
      return customPinkIcon;
    default:
      return customDefaultIcon;
  }
};
