import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

// Zod schema for order filters form validation
const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>;

// Main component for rendering order table filters
export function OrderTableFilters() {

    // React Router hook for managing URL search params
    const [searchParams, setSearchParams] = useSearchParams();

    // Extract current filter values from URL
    const orderId = searchParams.get('orderId');
    const customerName = searchParams.get('customerName');
    const status = searchParams.get('status');

    // Initialize react-hook-form with validation and default values
    const { register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues: {
            orderId: orderId ?? '',
            customerName: customerName ?? '',
            status: status ?? 'all',
        },
    })

    // Handles form submission and updates URL search params
    function handleFilter({orderId, customerName, status} : OrderFiltersSchema) { 
        setSearchParams(state => {
            if(orderId){
                state.set('orderId', orderId);
            } else {
                state.delete('orderId');
            }

            if(customerName){
                state.set('customerName', customerName);
            } else {
                state.delete('customerName');
            }

            if(status){
                state.set('status', status);
            } else {
                state.delete('status');
            }

            state.set('page', '1'); // Reset to first page on filter change

            return state;
        })
    }


    // Handles clearing all filters and resetting to the first page
    function handleClearFilters() {
        setSearchParams(state => {
            state.delete('orderId');
            state.delete('customerName');
            state.delete('status');
            state.set('page', '1'); // Reset to first page on filter clear
            return state;
        });
        reset(
            {
                orderId: '',
                customerName: '',
                status: 'all',
            }
        ); // Reset form fields
    }

    // Renders the filter form UI
    return (
        <form onSubmit={handleSubmit(handleFilter)} className=" flex items-center gap-2">
            <span className=" text-sm font-semibold">Filtros</span>
            <Input placeholder="ID do pedido" className=" h-8 w-auto" {...register('orderId')}/>
            <Input placeholder="Nome do cliente" className=" h-8 w-[328px]" {...register('customerName')}/>

            {/* Controlled select for order status */}
            <Controller
                name="status"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => (
                    <Select
                        defaultValue="all"
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className=" h-8 w-[200px]">
                            <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="processing">Em processamento</SelectItem>
                            <SelectItem value="shipped">Enviado</SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                            <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />

            {/* Submit button for filtering */}
            <Button type="submit" variant="secondary" size="xs">
                <Search className=" mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>

            {/* Button to remove filters (functionality not implemented) */}
            <Button onClick={handleClearFilters} type="button" variant="outline" size="xs">
                <X className=" mr-2 h-4 w-4" />
                Remover filtros
            </Button>
        </form>
    )
}
