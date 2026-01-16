import { useMemo } from "react";
import { useMarkers } from "@/hooks/useMarkers";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { FaCalendarAlt } from "react-icons/fa";

const chartConfig = {
  count: {
    label: "Viajes",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

interface YearData {
  year: string;
  count: number;
}

export default function TripsPerYearChart() {
  const { markers, visitorFilter } = useMarkers();

  const { chartData, barColor } = useMemo(() => {
    const stats: Record<number, number> = {};

    markers.forEach((marker) => {
      const year = marker.data?.date?.year;
      const visitor = marker.data?.visitor;

      if (!year) return;

      // Filter based on visitorFilter
      let shouldCount = false;
      if (visitorFilter === "all") {
        shouldCount = true;
      } else if (visitorFilter === "lara") {
        shouldCount = visitor === "Lara" || visitor === "Both";
      } else if (visitorFilter === "alvaro") {
        shouldCount = visitor === "Álvaro" || visitor === "Both";
      }

      if (shouldCount) {
        stats[year] = (stats[year] || 0) + 1;
      }
    });

    const data: YearData[] = Object.keys(stats)
      .sort((a, b) => Number(a) - Number(b))
      .map((year) => ({
        year: year,
        count: stats[Number(year)],
      }));

    // Determine bar color based on filter
    let color = "#3b82f6"; // blue for "all"
    if (visitorFilter === "lara") {
      color = "#FF6FAF"; // pink
    } else if (visitorFilter === "alvaro") {
      color = "#10b981"; // green
    }

    return { chartData: data, barColor: color };
  }, [markers, visitorFilter]);

  return (
    <Card className="w-full lg:w-[48%] border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <CardHeader className="pb-5">
        <CardTitle className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900">
          <FaCalendarAlt size={24} className="text-stats-blue" />
          <span>Viajes por año</span>
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
              dataKey="year"
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
            <Bar dataKey="count" fill={barColor} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
