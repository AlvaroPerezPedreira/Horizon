import React, { useState } from "react";
import { useMarkers } from "@/hooks/useMarkers";
import countryMappings from "@/utils/CountryMapUtils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TbUserStar } from "react-icons/tb";

interface CountryMapFilterProps {
  setColor: (color: string) => void;
  selectedCountries: Set<string>;
  setSelectedCountries: (countries: Set<string>) => void;
}

export default function CountryMapFilter({
  setColor,
  selectedCountries,
  setSelectedCountries,
}: CountryMapFilterProps) {
  const { uniqueCountries, uniqueLCountries, uniqueACountries, visitorFilter, filterByVisitor } = useMarkers();
  const [selectedValue, setSelectedValue] = useState<string>(visitorFilter || "all");

  const convertToEnglishNames = (spanishNames: string[]): string[] => {
    return spanishNames
      .map((spanishName) => {
        const countryMapping = countryMappings[spanishName];
        return countryMapping ? countryMapping.name : spanishName;
      })
      .filter((name): name is string => Boolean(name));
  };

  const handleValueChange = (value: string) => {
    if (value === "all") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueCountries)));
      setColor("#3b82f6");
      setSelectedValue("all");
      filterByVisitor("all");
    } else if (value === "lara") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueLCountries)));
      setColor("#FF6FAF");
      setSelectedValue("lara");
      filterByVisitor("lara");
    } else if (value === "alvaro") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueACountries)));
      setColor("#10b981");
      setSelectedValue("alvaro");
      filterByVisitor("alvaro");
    } else {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueCountries)));
      setColor("#3b82f6");
      setSelectedValue("all");
      filterByVisitor("all");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 p-5 sm:p-6">
      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-5">
        <TbUserStar size={24} className="text-stats-blue" />
        <span>Filtrar por usuario</span>
      </h2>
      <div className="pl-4 sm:pl-6">
        <RadioGroup
          value={selectedValue}
          onValueChange={handleValueChange}
          className="gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="cursor-pointer">
              Todos
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lara" id="lara" />
            <Label htmlFor="lara" className="cursor-pointer">
              Lara
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="alvaro" id="alvaro" />
            <Label htmlFor="alvaro" className="cursor-pointer">
              Álvaro
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
