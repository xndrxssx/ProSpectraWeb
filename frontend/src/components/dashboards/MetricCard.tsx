import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
}

export function MetricCard({ title, value, description, icon, trend }: MetricCardProps) {
  const trendUp = trend && trend.startsWith('+');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-slate-500">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-slate-500">{description}</p>
        {trend && (
            <div className={`mt-2 flex items-center text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}>
                {trendUp ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {trend}
            </div>
        )}
      </CardContent>
    </Card>
  );
}