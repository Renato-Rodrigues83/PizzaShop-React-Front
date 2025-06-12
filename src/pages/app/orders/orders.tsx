import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { OrderTableSkeleton } from "./order-table-skeleton";

// Orders page component
export function Orders() {

    // Get and set URL search parameters
    const [searchParams, setSearchParams] = useSearchParams()

    // Extract filter values from search params
    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    // Parse page index from search params (default to 1, convert to zero-based)
    const pageIndex = z.coerce
        .number()
        .transform(page => page - 1)
        .parse(searchParams.get('page') ?? '1')

    // Fetch orders data using React Query
    const {data : result, isLoading : isLoadingOrders} = useQuery({
        queryKey : ['orders', pageIndex, orderId, customerName, status],
        queryFn : () => getOrders({
            pageIndex,
            orderId,
            customerName,
            status: status === 'all' ? null : status,
        }),
    })

    // Handle pagination changes
    function handlePaginate(pageIndex: number) {
        setSearchParams((state) => {
            state.set('page', (pageIndex + 1).toString())
            return state
        })
    }

    return (
        <>
            {/* Set page title */}
            <Helmet title="Pedidos" />
            <div className="flex flex-col gap-4">
                <h1 className=" text-3xl font-bold tracking-tight">Pedidos</h1>
            
            <div className=" space-y-2.5">
                {/* Filters for the orders table */}
                <OrderTableFilters />
                <div className=" border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" w-[64px]"></TableHead>
                                <TableHead className=" w-[148px]">Identificador</TableHead>
                                <TableHead className=" w-[188px]">Realizado há</TableHead>
                                <TableHead className=" w-[148px]">Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead className=" w-[148px]">Total do pedido</TableHead>
                                <TableHead className=" w-[164px]"></TableHead>
                                <TableHead className=" w-[132px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoadingOrders && <OrderTableSkeleton />}

                            {/* Render each order row */}
                            {result && result.orders.map(order => {
                                return <OrderTableRow key={order.orderId} order={order} />
                            })}
                        </TableBody>
                    </Table>
                    </div>
                    
                    {/* Pagination controls */}
                    {result &&
                        (<Pagination
                            onPageChange={handlePaginate}
                            pageIndex={result.meta.pageIndex}
                            totalCount={result.meta.totalCount}
                            perPage={result.meta.perPage} />
                        )}
                </div>
            </div>
        </>
    )
}