import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className=" text-7xl font-bold">404</h1>
      <h1 className="text-4xl font-bold">Página não encontrada</h1>
      <p className=" text-accent-foreground">
        Voltar para o <Link to="/" className=" text-sky-600 dark:text-sky-400">Dashboard</Link>
      </p>
    </div>
  );
}