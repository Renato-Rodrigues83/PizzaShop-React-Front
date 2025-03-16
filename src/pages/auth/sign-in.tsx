import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

 const handleSignIn = async (data: SignInForm) => {
    console.log("Enviando os dados do formulário...", data);
    try {
         // Simula um delay para testar o estado do botão
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login realizado com sucesso!");
    toast.success("Um link de acesso foi enviado para o seu e-mail!", {
        action: {
            label: "Reenviar",
            onClick: () => handleSignIn(data),
        },
    });
    } catch (error) {
        toast.error("Ocorreu um erro ao tentar realizar o login!");
    }
  };


  return (
    <>
      <Helmet title="Login" />
        <div className="p-8">
            <Button variant="ghost" asChild className="absolute top-8 right-8">
                <Link to="/sign-up" className="">
                    Novo estabelecimento
                </Link>
            </Button>
            
            <div className="w-[358px] flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                    <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
                </div>

                <div>
                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" {...register("email")} />
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit">Acessar Painel</Button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}
