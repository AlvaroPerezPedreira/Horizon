import React from "react";
import { Button } from "../ui/button";
import { GrFilter } from "react-icons/gr";

type MapOption = 1 | 2 | 3 | 4;

interface MapPaginationProps {
  mapOption: MapOption;
  handleFilterClick: () => void;
}

export default function MapFilter({
  mapOption,
  handleFilterClick,
}: MapPaginationProps): React.ReactElement {
  const isBorderBlack = mapOption === 1 || mapOption === 2;
  const borderClass = isBorderBlack
    ? "!bg-transparent !border-black !text-black hover:!bg-black hover:!text-white"
    : "!bg-transparent !border-white !text-white hover:!bg-white hover:!text-black";

  return (
    <>
      <Button
        variant="outline"
        className={`!w-10 !h-10 !rounded-full !border-2 !p-0 ${borderClass} !ring-0 !outline-none cursor-pointer`}
        style={{
          transition:
            "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
        onClick={handleFilterClick}
        onBlur={(e) => e.currentTarget.blur()}
        aria-label="Previous layer"
      >
        <span style={{ transform: "scale(1.5)" }}>
          <GrFilter />
        </span>
      </Button>
    </>
  );
}
