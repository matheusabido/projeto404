import Button from "@/components/Button";
import Header from "@/components/Header";
import { FaSearch } from "react-icons/fa";
import { FaDatabase, FaTv } from "react-icons/fa6";

export default function HomePage() {
  return <>
    <Header />
    <main className="mx-8 py-16 border-b border-gray-300">
      <div className="flex items-center gap-4">
        <FaDatabase className="text-4xl" />
        <p className="text-4xl font-medium">Banco de Desaparecidos</p>
      </div>
      <div className="mt-4 text-gray-800">
        <p>Busque por informações de pessoas desaparecidas</p>
        <p>ou contribua adicionando novas informações.</p>
      </div>
      <div className="flex gap-4 mt-8">
        <Button to="/buscar">
          <span className="flex items-center gap-4">
            <FaSearch /> Buscar
          </span>
        </Button>
        <Button variant="outline" to="/tv">
          <span className="flex items-center gap-4">
            <FaTv /> Modo TV
          </span>
        </Button>
      </div>
    </main>
  </>;
}