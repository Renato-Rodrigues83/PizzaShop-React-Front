import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
    
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpForm>({
        resolver: zodResolver(signUpForm),
    });

    const handleSignUp = async (data: SignUpForm) => {
        console.log("Enviando os dados do formulário...", data);
        try {
            // Simula um delay para testar o estado do botão
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Login realizado com sucesso!");
            toast.success("Restaurante cadastrado com sucesso!", {
                action: {
                    label: "Login",
                    onClick: () => navigation("/sign-in"),
                },
            });
        } catch (error) {
            toast.error("Erro ao realizar o cadastro, tente novamente!");
        }
    };

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
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
                            <Button disabled={isSubmitting} className="w-full" type="submit">
                                Finalizar Cadastro
                            </Button>

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
