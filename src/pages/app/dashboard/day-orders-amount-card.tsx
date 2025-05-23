import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function DayOrdersAmountCard() {
    return (
        <Card>
            <CardHeader className=" flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className=" text-base font-semibold">
                    Pedidos (dia)
                </CardTitle>
                <Utensils className=" h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className=" space-y-1">
                <span className=" text-2xl font-bold tracking-tight">
                    20
                </span>
                <p>
                    <span className=" text-rose-500 dark:text-rose-400">
                        -1%
                    </span>{' '}
                    em relação à ontem
                </p>
            </CardContent>
        </Card>
    )
}