import React, { useMemo } from "react";
import { useMarkers } from "@/hooks/useMarkers";
import {
  continentCodes,
  continents,
  getContinent,
} from "../../utils/CountryMapUtils";
import { VscGraph } from "react-icons/vsc";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

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

export default function CountryMapBarChart() {
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();

  const continentStats = useMemo(() => {
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

    return {
      total: getCountsByContinent(uniqueCountries),
      lara: getCountsByContinent(uniqueLCountries),
      alvaro: getCountsByContinent(uniqueACountries),
    };
  }, [uniqueCountries, uniqueLCountries, uniqueACountries]);

  const chartData: ContinentData[] = continents.map((continent) => ({
    continent: continentCodes[continent] || continent,
    total: continentStats.total[continent] || 0,
    lara: continentStats.lara[continent] || 0,
    alvaro: continentStats.alvaro[continent] || 0,
  }));

  return (
    <Card className="w-full border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-5">
        <CardTitle className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
          <VscGraph size={24} className="text-stats-blue" />
          <span>Gráfico por continente</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="continent"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            <Bar dataKey="lara" fill="var(--color-lara)" radius={4} />
            <Bar dataKey="alvaro" fill="var(--color-alvaro)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
