
import React from "react";
import { format } from "date-fns";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { VitalSign } from "@/types/health";

interface VitalSignsChartProps {
  data: VitalSign[];
  title: string;
  color?: string;
  yAxisLabel?: string;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  showGrid?: boolean;
}

const VitalSignsChart: React.FC<VitalSignsChartProps> = ({
  data,
  title,
  color = "#8B5CF6",
  yAxisLabel = "",
  xAxisDataKey = "date",
  yAxisDataKey = "value",
  showGrid = true,
}) => {
  const chartData = data.map(item => {
    let value: number;
    
    // Handle blood pressure which is stored as "systolic/diastolic"
    if (typeof item.value === 'string' && item.type === 'blood_pressure') {
      value = parseInt(item.value.split('/')[0]);
    } else if (typeof item.value === 'number') {
      value = item.value;
    } else {
      value = 0;
    }
    
    return {
      date: format(new Date(item.timestamp), 'dd/MM'),
      value,
      unit: item.unit,
      fullDate: format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm'),
      notes: item.notes || ''
    };
  });

  const config = {
    [yAxisDataKey]: {
      label: title,
      theme: {
        light: color,
        dark: color,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <ChartContainer config={config} className="aspect-[4/3] w-full">
        <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
          <XAxis
            dataKey={xAxisDataKey}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey={yAxisDataKey}
            strokeWidth={2}
            activeDot={{ r: 6, strokeWidth: 2 }}
            dot={{ r: 3 }}
            stroke={color}
            type="monotone"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default VitalSignsChart;
