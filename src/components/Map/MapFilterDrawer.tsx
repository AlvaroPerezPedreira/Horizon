import React, { useState, useMemo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMarkers } from "@/hooks/useMarkers";
import type { VisitorFilter } from "@/stores/MarkersStore";
import { CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface MapFilterDrawerProps {
  onOpenFilterChange: (open: boolean) => void;
  isOpen: boolean;
}

export default function MapFilterDrawer({
  isOpen,
  onOpenFilterChange,
}: MapFilterDrawerProps) {
  const {
    visitorFilter,
    yearFilter,
    filterByVisitor,
    filterByYear,
    resetFilters,
    markers,
    filteredMarkers,
  } = useMarkers();

  const [tempVisitorFilter, setTempVisitorFilter] =
    useState<VisitorFilter>(visitorFilter);
  const [tempYearFilter, setTempYearFilter] = useState<string>(
    yearFilter?.toString() || "all"
  );

  // Usar useMemo en lugar de useEffect para evitar renders en cascada
  const availableYears = useMemo(() => {
    let filtered = [...markers];

    if (tempVisitorFilter !== "all") {
      filtered = filtered.filter((marker) => {
        if (!marker.data) return false;

        const visitor = marker.data.visitor;
        const visitors = marker.data.visitors || [];

        const hasVisitor = (name: string) => {
          if (visitor === name) return true;
          return visitors.some((v) =>
            typeof v === "string" ? v === name : false
          );
        };

        switch (tempVisitorFilter) {
          case "lara":
            return hasVisitor("Lara");
          case "alvaro":
            return hasVisitor("Álvaro");
          case "both":
            return hasVisitor("Lara") && hasVisitor("Álvaro");
          default:
            return true;
        }
      });
    }

    // Contar viajes por año
    const yearCounts: { [year: number]: number } = {};
    filtered.forEach((marker) => {
      if (marker.data && marker.data.date && marker.data.date.year) {
        const year = marker.data.date.year;
        if (!isNaN(year)) {
          yearCounts[year] = (yearCounts[year] || 0) + 1;
        }
      }
    });

    // Convertir a array y ordenar
    return Object.entries(yearCounts)
      .map(([year, count]) => ({
        year: Number(year),
        count,
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.year - a.year);
  }, [tempVisitorFilter, markers]);

  const filterOptions: {
    value: VisitorFilter;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "all",
      label: "Todos los viajes",
      icon: <CiUser className="w-5 h-5" />,
    },
    { value: "lara", label: "Solo Lara", icon: <CiUser className="w-5 h-5" /> },
    {
      value: "alvaro",
      label: "Solo Álvaro",
      icon: <CiUser className="w-5 h-5" />,
    },
    {
      value: "both",
      label: "Viajes juntos",
      icon: <CiUser className="w-5 h-5" />,
    },
  ];

  const handleApplyFilter = () => {
    filterByVisitor(tempVisitorFilter);
    filterByYear(tempYearFilter === "all" ? null : Number(tempYearFilter));
    onOpenFilterChange(false);
  };

  const handleReset = () => {
    setTempVisitorFilter("all");
    setTempYearFilter("all");
    resetFilters();
    onOpenFilterChange(false);
  };

  const getFilterCount = (filter: VisitorFilter): number => {
    if (filter === "all") return markers.length;

    return markers.filter((marker) => {
      if (!marker.data) return false;

      const visitor = marker.data.visitor;
      const visitors = marker.data.visitors || [];

      const hasVisitor = (name: string) => {
        if (visitor === name) return true;
        return visitors.some((v) =>
          typeof v === "string" ? v === name : false
        );
      };

      switch (filter) {
        case "lara":
          return hasVisitor("Lara");
        case "alvaro":
          return hasVisitor("Álvaro");
        case "both":
          return hasVisitor("Lara") && hasVisitor("Álvaro");
        default:
          return true;
      }
    }).length;
  };

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={onOpenFilterChange}>
      <DrawerContent className="bg-white !max-w-md h-full !z-[1000]">
        <div className="w-full h-full flex flex-col">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>Filtros</DrawerTitle>
                <DrawerDescription>
                  {filteredMarkers.length} de {markers.length} viajes
                </DrawerDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenFilterChange(false)}
                className="cursor-pointer"
              >
                <span style={{ transform: "scale(1.5)" }}>
                  <IoClose />
                </span>
              </Button>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Filtro por visitante */}
              <div>
                <h3 className="text-sm font-semibold mb-3">
                  Filtrar por visitante
                </h3>
                <div className="space-y-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTempVisitorFilter(option.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        tempVisitorFilter === option.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`${
                            tempVisitorFilter === option.value
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        >
                          {option.icon}
                        </div>
                        <span
                          className={`font-medium ${
                            tempVisitorFilter === option.value
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          tempVisitorFilter === option.value
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {getFilterCount(option.value)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Filtrar por año</h3>
                <Select
                  value={tempYearFilter}
                  onValueChange={(value) => setTempYearFilter(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un año" />
                  </SelectTrigger>
                  <SelectContent position="popper" side="bottom" align="start">
                    <SelectGroup>
                      <SelectItem value="all" className="cursor-pointer">
                        Todos los años ({markers.length})
                      </SelectItem>
                      {availableYears.map(({ year, count }) => (
                        <SelectItem
                          key={year}
                          value={year.toString()}
                          className="cursor-pointer"
                        >
                          {year} ({count})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DrawerFooter className="border-t p-4">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1 cursor-pointer"
              >
                Reset
              </Button>
              <Button
                onClick={handleApplyFilter}
                className="flex-1 cursor-pointer"
              >
                Aplicar filtro
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
