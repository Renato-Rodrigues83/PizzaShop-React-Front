//export interface OrderDetailsProps {}

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function OrderDetails() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Pedido : we8ra7hb7ffx99
                </DialogTitle>
                <DialogDescription>
                    Detalhes do pedido
                </DialogDescription>
            </DialogHeader>
            <div className=" space-y-6">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className=" text-muted-foreground">
                                Status
                            </TableCell>
                            <TableCell className=" flex justify-end">
                                <div className=" flex items-center gap-2">
                                    <span className=" h-2 w-2 rounded-full bg-slate-400" />
                                    <span className=" font-medium text-muted-foreground">
                                        Pendente
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" text-muted-foreground">
                                Cliente
                            </TableCell>
                            <TableCell className=" flex justify-end">
                                Nome do Cliente
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" text-muted-foreground">
                                Telefone
                            </TableCell>
                            <TableCell className=" flex justify-end">
                                +55 11 91234-5678
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" text-muted-foreground">
                                E-mail
                            </TableCell>
                            <TableCell className=" flex justify-end">
                                cliente@email.com
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" text-muted-foreground">
                                Realizado há
                            </TableCell>
                            <TableCell className=" flex justify-end">
                                há 15 minutos
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Produto
                            </TableHead>
                            <TableHead className=" text-right">
                                Quantidade
                            </TableHead>
                            <TableHead className=" text-right">
                                Preço
                            </TableHead>
                            <TableHead className=" text-right">
                                Subtotal
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Nome do Produto
                            </TableCell>
                            <TableCell className=" text-right">
                                2
                            </TableCell>
                            <TableCell className=" text-right">
                                R$ 50,00
                            </TableCell>
                            <TableCell className=" text-right">
                                R$ 100,00
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Nome do Produto
                            </TableCell>
                            <TableCell className=" text-right">
                                1
                            </TableCell>
                            <TableCell className=" text-right">
                                R$ 50,00
                            </TableCell>
                            <TableCell className=" text-right">
                                R$ 50,00
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>
                                Total
                            </TableCell>
                            <TableCell className=" text-right font-medium">
                                R$ 150,00
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </DialogContent>
    )
}