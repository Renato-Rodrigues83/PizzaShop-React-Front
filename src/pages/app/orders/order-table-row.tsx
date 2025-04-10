import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Search, ArrowRight, X } from "lucide-react";

export function OrderTableRow() {
    return (
        <TableRow>
            <TableCell>
                <Button variant="outline" size="xs">
                    <Search className=" h-3 w-3" />
                    <span className="sr-only">Detalhes do pedido</span>
                </Button>
            </TableCell>
            <TableCell className=" font-mono text-xs font-medium">
                2334445555
            </TableCell>
            <TableCell className=" text-muted-foreground">
                há 15 minutos
            </TableCell>
            <TableCell className=" flex items-center gap-2">
                <span className=" h-2 w-2 rounded-full bg-slate-400" />
                <span className=" font-medium text-muted-foreground">Pendente</span>
            </TableCell>
            <TableCell className=" font-medium">
                Nome do Cliente
            </TableCell>
            <TableCell className=" font-medium">
                R$ 100,00
            </TableCell>
            <TableCell>
                <Button variant="outline" size="xs">
                    <ArrowRight className=" h-3 w-3 mr-2" />
                    Aprovar
                </Button>
            </TableCell>
            <TableCell>
                <Button variant="ghost" size="xs">
                    <X className=" h-3 w-3 mr-2" />
                    Cancelar
                </Button>
            </TableCell>
        </TableRow>
    )
}