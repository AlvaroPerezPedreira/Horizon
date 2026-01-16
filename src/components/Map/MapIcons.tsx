import L from "leaflet";
import type { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FaMapMarkerAlt } from "react-icons/fa";

export const customBlackIcon: DivIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="black" />
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const customPinkIcon: DivIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<FaMapMarkerAlt size={32} color="red" />),
  iconSize: [32, 32],
  className: "custom-marker",
});

export const customBlueIcon: DivIcon = L.divIcon({
  html: ReactDOMServer.renderToString(
    <FaMapMarkerAlt size={32} color="blue" />
  ),
  iconSize: [32, 32],
  className: "custom-marker",
});

type VisitorName = "Álvaro" | "Lara";

export const getCustomIconByName = (name: VisitorName | string): DivIcon => {
  switch (name) {
    case "Álvaro":
      return customBlueIcon;
    case "Lara":
      return customPinkIcon;
    default:
      return customBlackIcon;
  }
};
