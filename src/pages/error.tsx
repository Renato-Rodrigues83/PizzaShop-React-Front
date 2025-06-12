import { Link, useRouteError } from "react-router-dom";

export function Error() {

    const error = useRouteError() as Error

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className=" text-7xl font-bold">Whoops, algo aconteceu...</h1>
      <p className=" text-accent-foreground">
        Um erro aconteceu na aplicação, mais detalhes abaixo:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className=" text-accent-foreground">
        Voltar para o <Link to="/" className=" text-sky-600 dark:text-sky-400">Dashboard</Link>
      </p>
    </div>
  );
}