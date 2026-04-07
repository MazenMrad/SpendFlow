"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

interface Category {
    name: string;
    amount: string;
    percentage: number;
    color: string;
}

interface SpendingByCategoryProps {
    categories?: Category[];
}

export default function SpendingByCategory({ categories: propCategories = [] }: SpendingByCategoryProps) {
    const { chartData, chartConfig, totalSpent } = React.useMemo(() => {
        const data: any[] = [];
        const config: ChartConfig = {
            visitors: { label: "Amount" }
        };
        let total = 0;

        propCategories.forEach((cat, index) => {
            const key = `cat_${index}`;
            // Handle "120.50 TND" -> 120.50
            const amountVal = parseFloat(cat.amount.split(' ')[0].replace(/,/g, ''));
            const val = isNaN(amountVal) ? 0 : amountVal;
            total += val;

            data.push({
                browser: cat.name,
                visitors: val,
                fill: cat.color,
            });

            config[key] = {
                label: cat.name,
                color: cat.color
            };
        });

        return { chartData: data, chartConfig: config, totalSpent: total };
    }, [propCategories]);

    if (propCategories.length === 0) {
        return (
            <Card className="flex flex-col items-center justify-center min-h-[300px] shadow-[0_5px_10px_0_#F1F2FA] border-none">
                <p className="text-muted-foreground font-gilroy-medium">No category data available.</p>
            </Card>
        )
    }

    return (
        <Card className="flex flex-col shadow-[0_5px_10px_0_#F1F2FA] border-none h-full bg-white">
            <CardHeader className="items-center pb-0">
                <CardTitle className="font-gilroy-bold text-lg text-[#1C1F37]">Spending by Category</CardTitle>
                <CardDescription className="font-gilroy-medium text-gray-500">Overview</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel className="bg-white border-[#F1F2FA] font-gilroy-medium" />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-[#1C1F37] text-3xl font-bold font-gilroy-bold"
                                                >
                                                    {totalSpent.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-gray-500 font-gilroy-medium text-sm"
                                                >
                                                    TND
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>

                {/* Spending Trends Section (Integrated) */}
                <div className="mt-6 space-y-6">
                    {/* Multi-Color Progress Bar */}
                    <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#F5F6FB] gap-[2px]">
                        {propCategories.map((cat, index) => (
                            <div
                                key={`bar-${index}`}
                                style={{
                                    width: `${cat.percentage}%`,
                                    backgroundColor: cat.color
                                }}
                                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                            />
                        ))}
                    </div>

                    {/* Categories List */}
                    <div className="space-y-4 pb-4">
                        {propCategories.map((cat, index) => (
                            <div key={`list-${index}`} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: cat.color }}
                                    />
                                    <span className="font-gilroy-bold text-sm text-[#1C1F37]">
                                        {cat.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="font-gilroy-bold text-sm text-[#1C1F37]">
                                        {cat.amount}
                                    </span>
                                    <div className="bg-[#E8F5FF] px-2 py-1 rounded-full text-[#207DFF] font-gilroy-bold text-xs min-w-[40px] text-center">
                                        {Math.round(cat.percentage)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium text-[#1C1F37] font-gilroy-medium">
                    Total Spent: {totalSpent.toLocaleString()} TND <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground font-gilroy">
                    Showing total spending for the current month
                </div>
            </CardFooter>
        </Card>
    )
}
