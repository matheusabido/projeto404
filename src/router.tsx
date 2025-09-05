import { createBrowserRouter } from "react-router-dom";
import Button from "./components/Button";

function lazy(path: string, name: string) {
  return { path, lazy: () => import(`./pages/${name}.tsx`).then(module => ({ Component: module.default })) };
}

const router = createBrowserRouter([
  {
    errorElement: (
      <div className="h-dvh flex flex-col items-center justify-center">
        <p className="font-medium text-2xl mb-4">Erro! Página não encontrada.</p>
        <Button to="/">Voltar para o início</Button>
      </div>
    ),
  },
  lazy("/", "Home"),
  lazy("/tv", "ModoTV"),
]);

export default router;