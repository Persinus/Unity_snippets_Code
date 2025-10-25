'use client';

import { Snippet } from '@/lib/snippets';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

interface CommentsChartProps {
  data: Snippet[];
}

export default function CommentsChart({ data }: CommentsChartProps) {
  // Sort data to show snippets with most comments first, and take top 10
  const sortedData = data
    .filter(item => (item.commentCount ?? 0) > 0)
    .sort((a, b) => (b.commentCount ?? 0) - (a.commentCount ?? 0))
    .slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={sortedData} layout="vertical" margin={{ left: 10, right: 30 }}>
        <XAxis type="number" hide />
        <YAxis
          dataKey="title"
          type="category"
          tickLine={false}
          axisLine={false}
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          width={150}
          interval={0}
          tick={{
            formatter: (value: string) => value.length > 20 ? `${value.substring(0, 20)}...` : value
          }}
        />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Snippet
                      </span>
                      <span className="font-bold">{label}</span>
                    </div>
                    <div className="flex flex-col space-y-1 text-right">
                       <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Bình luận
                      </span>
                      <span className="font-bold text-primary">{payload[0].value}</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey="commentCount" name="Số bình luận" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
