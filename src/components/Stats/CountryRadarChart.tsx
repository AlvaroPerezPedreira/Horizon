import { useMemo } from "react";
import { useMarkers } from "@/hooks/useMarkers";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { FaGlobeAmericas } from "react-icons/fa";
import {
  continentCodes,
  continents,
  getContinent,
} from "../../utils/CountryMapUtils";

const chartConfig = {
  total: {
    label: "Total",
    color: "#3b82f6",
  },
  lara: {
    label: "Lara",
    color: "#FF6FAF",
  },
  alvaro: {
    label: "Álvaro",
    color: "#10b981",
  },
} satisfies ChartConfig;

interface ContinentData {
  continent: string;
  total: number;
  lara: number;
  alvaro: number;
}

export default function CountryRadarChart() {
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();

  const chartData = useMemo(() => {
    const getCountsByContinent = (countries: string[]) => {
      const counts: Record<string, number> = {};
      countries.forEach((country) => {
        const continent = getContinent(country);
        if (continent) {
          counts[continent] = (counts[continent] || 0) + 1;
        }
      });
      return counts;
    };

    const continentStats = {
      total: getCountsByContinent(uniqueCountries),
      lara: getCountsByContinent(uniqueLCountries),
      alvaro: getCountsByContinent(uniqueACountries),
    };

    const data: ContinentData[] = continents.map((continent) => ({
      continent: continentCodes[continent] || continent,
      total: continentStats.total[continent] || 0,
      lara: continentStats.lara[continent] || 0,
      alvaro: continentStats.alvaro[continent] || 0,
    }));

    return data;
  }, [uniqueCountries, uniqueLCountries, uniqueACountries]);

  return (
    <Card className="w-full lg:w-[48%] border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-5">
        <CardTitle className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
          <FaGlobeAmericas size={24} className="text-stats-blue" />
          <span>Países por continente</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="continent" className="text-xs" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="total"
              fill="var(--color-total)"
              fillOpacity={0}
              stroke="var(--color-total)"
              strokeWidth={2}
            />
            <Radar
              dataKey="lara"
              fill="var(--color-lara)"
              fillOpacity={0}
              stroke="var(--color-lara)"
              strokeWidth={2}
            />
            <Radar
              dataKey="alvaro"
              fill="var(--color-alvaro)"
              fillOpacity={0}
              stroke="var(--color-alvaro)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
