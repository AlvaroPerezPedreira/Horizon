import React from "react";
import { Button } from "../ui/button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type MapOption = 1 | 2 | 3 | 4;

interface MapPaginationProps {
  mapOption: MapOption;
  setMapOption: (option: MapOption) => void;
}

const MAP_LAYERS = [
  { id: 1, name: "OpenStreetMap" },
  { id: 2, name: "CartoDB Light" },
  { id: 3, name: "CartoDB Dark" },
  { id: 4, name: "Satellite" },
] as const;

export default function MapPagination({
  mapOption,
  setMapOption,
}: MapPaginationProps): React.ReactElement {
  const handlePrevious = (): void => {
    const newOption = mapOption === 1 ? 4 : ((mapOption - 1) as MapOption);
    setMapOption(newOption);
  };

  const handleNext = (): void => {
    const newOption = mapOption === 4 ? 1 : ((mapOption + 1) as MapOption);
    setMapOption(newOption);
  };

  const handleLayerClick = (layer: MapOption): void => {
    setMapOption(layer);
  };

  const isBorderBlack = mapOption === 1 || mapOption === 2;
  const borderClass = isBorderBlack
    ? "!bg-transparent !border-black !text-black hover:!bg-black hover:!text-white"
    : "!bg-transparent !border-white !text-white hover:!bg-white hover:!text-black";

  const getLayerButtonClass = (layer: MapOption): string => {
    const isActive = mapOption === layer;

    if (isActive) {
      if (isBorderBlack) {
        return "!bg-black !text-white !border-black";
      } else {
        return "!bg-white !text-black !border-white";
      }
    }

    if (isBorderBlack) {
      return "!bg-transparent !border-black !text-black hover:!bg-black hover:!text-white";
    } else {
      return "!bg-transparent !border-white !text-white hover:!bg-white hover:!text-black";
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Button
        variant="outline"
        className={`!w-10 !h-10 !rounded-full !border-2 !p-0 ${borderClass} !ring-0 !outline-none cursor-pointer`}
        style={{
          transition:
            "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
        onClick={(e) => {
          e.preventDefault();
          handlePrevious();
        }}
        onBlur={(e) => e.currentTarget.blur()}
        aria-label="Previous layer"
      >
        <span style={{ transform: "scale(1.5)" }}>
          <MdChevronLeft />
        </span>
      </Button>

      {MAP_LAYERS.map((layer) => (
        <Button
          key={layer.id}
          variant="outline"
          className={`!w-10 !h-10 !rounded-full !border-2 !p-0 cursor-pointer ${getLayerButtonClass(
            layer.id as MapOption
          )} !ring-0 !outline-none`}
          style={{
            transition:
              "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
          }}
          onClick={(e) => {
            e.preventDefault();
            handleLayerClick(layer.id as MapOption);
          }}
          onBlur={(e) => e.currentTarget.blur()}
          aria-label={`Layer ${layer.id}`}
        >
          {layer.id}
        </Button>
      ))}

      <Button
        variant="outline"
        className={`!w-10 !h-10 !rounded-full !border-2 !p-0 ${borderClass} !ring-0 !outline-none cursor-pointer`}
        style={{
          transition:
            "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
        onClick={(e) => {
          e.preventDefault();
          handleNext();
        }}
        onBlur={(e) => e.currentTarget.blur()}
        aria-label="Next layer"
      >
        <span style={{ transform: "scale(1.5)" }}>
          <MdChevronRight />
        </span>
      </Button>
    </div>
  );
}
