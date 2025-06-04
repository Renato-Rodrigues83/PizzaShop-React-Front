import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

// Define the schema for the sign-up form using Zod for validation
const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
});

// Infer the TypeScript type from the Zod schema
type SignUpForm = z.infer<typeof signUpForm>;

// SignUp component for restaurant registration
export function SignUp() {
    
    const navigation = useNavigate();

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpForm>();

    // Set up mutation for registering a restaurant
    const { mutateAsync : registerRestaurantFn} = useMutation({
        mutationFn : registerRestaurant,
    })

    // Handle form submission
    const handleSignUp = async (data: SignUpForm) => {
        try {
            // Call the mutation to register the restaurant
            await registerRestaurantFn({
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone,
            })
            // Show success toast and provide a login action
            toast.success("Restaurante cadastrado com sucesso!", {
                action: {
                    label: "Login",
                    onClick: () => navigation(`/sign-in?email=${data.email}`),
                },
            });
        } catch (error) {
            // Show error toast if registration fails
            toast.error("Erro ao realizar o cadastro, tente novamente!");
        }
    };

    return (
        <>
            {/* Set the page title */}
            <Helmet title="Cadastro" />
            <div className="p-8">
                {/* Button to navigate to the sign-in page */}
                <Button variant="ghost" asChild className="absolute top-8 right-8">
                    <Link to="/sign-in" className="">
                        Fazer login
                    </Link>
                </Button>
                <div className="w-[358px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!.</p>
                    </div>
                    <div>
                        {/* Sign-up form */}
                        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="restaurantName">Nome do restaurante</Label>
                                <Input id="restaurantName" type="text" {...register("restaurantName")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="managerName">Seu nome</Label>
                                <Input id="managerName" type="text" {...register("managerName")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" type="email" {...register("email")} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Seu celular</Label>
                                <Input id="phone" type="tel" {...register("phone")} />
                            </div>
                            {/* Submit button */}
                            <Button disabled={isSubmitting} className="w-full" type="submit">
                                Finalizar Cadastro
                            </Button>

                            {/* Terms and privacy policy notice */}
                            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                                Ao continuar, você concorda com os <a href="" className="underline underline-offset-4">Termos de Uso</a>{' '}
                                 e{' '}
                                <a href="" className="underline underline-offset-4">Política de Privacidade</a> do nosso site.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
