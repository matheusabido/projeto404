import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="p-4 px-8 flex justify-between items-center border-b border-gray-200">
      <Link className="font-medium text-xl" to="/">Banco de Desaparecidos</Link>
      <nav className="flex gap-4 justify-end">
        <Link className={clsx(pathname === "/" ? "font-medium" : "text-gray-700")} to="/">Início</Link>
        <Link className={clsx(pathname === "/buscar" ? "font-medium" : "text-gray-700")} to="/buscar">Buscar</Link>
        <Link className={clsx(pathname === "/tv" ? "font-medium" : "text-gray-700")} to="/tv">Modo TV</Link>
      </nav>
    </header>
  );
}