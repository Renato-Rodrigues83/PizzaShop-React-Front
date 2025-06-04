import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

// Define the schema for the sign-in form using Zod for validation
const signInForm = z.object({
  email: z.string().email(),
})

// Infer the TypeScript type from the Zod schema
type SignInForm = z.infer<typeof signInForm>

// SignIn component definition
export function SignIn() {

  // Get search parameters from the URL (e.g., pre-fill email)
  const [searchParams] = useSearchParams()

  // Initialize React Hook Form with default values and form state
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  })

  // Set up mutation for sign-in API call using React Query
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  // Handle form submission
  async function handleSignIn(data : SignInForm) {
    try {
      // Attempt to authenticate with the provided email
      await authenticate({ email: data.email });
      // Show success toast with option to resend
      toast.success("Um link de acesso foi enviado para o seu e-mail!", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    } catch (error) {
      // Show error toast if authentication fails
      toast.error("Ocorreu um erro ao tentar realizar o login!");
    }
  };

  // Render the sign-in form UI
  return (
    <>
      {/* Set the page title */}
      <Helmet title="Login" />
      <div className="p-8">
        {/* Button to navigate to sign-up page */}
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-up" className="">
            Novo estabelecimento
          </Link>
        </Button>
        
        <div className="w-[358px] flex flex-col justify-center gap-6">
          {/* Header and description */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
            <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro!</p>
          </div>

          <div>
            {/* Sign-in form */}
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                {/* Email input field */}
                <Input id="email" type="email" {...register("email")} />
              </div>
              {/* Submit button */}
              <Button disabled={isSubmitting} className="w-full" type="submit">Acessar Painel</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
