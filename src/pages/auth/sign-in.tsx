import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
//import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {

const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

 async function handleSignIn(data : SignInForm) {

    try {
      await authenticate({ email: data.email });
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
