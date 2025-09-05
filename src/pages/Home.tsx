import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaDatabase, FaSliders, FaTv } from "react-icons/fa6";

export default function HomePage() {
  const buscarSectionRef = useRef<HTMLDivElement>(null);
  
  return <>
    <Header />
    <div className="mx-8 py-16 border-b border-gray-300">
      <div className="flex items-center gap-4">
        <FaDatabase className="text-4xl" />
        <p className="text-4xl font-medium">Banco de Desaparecidos</p>
      </div>
      <div className="mt-4 text-gray-800">
        <p>Busque por informações de pessoas desaparecidas</p>
        <p>ou contribua adicionando novas informações.</p>
      </div>
      <div className="flex gap-4 mt-8">
        <Button onClick={() => buscarSectionRef.current?.scrollIntoView({ behavior: "smooth" })}>
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
    </div>
    <main>
      <div className="border-b border-gray-300 px-8 py-12">
        <p className="mb-4 font-medium text-xl">Você viu alguma dessas pessoas?</p>
        <Card />
      </div>

      <div className="px-8 py-12" ref={buscarSectionRef}>
        <div className="flex flex-wrap gap-8 justify-between items-center">
          <div>
            <p className="font-medium text-lg">Lista completa dos cadastros</p>
            <p className="text-gray-700">Exibindo 20 resultados de 413. Página 01 de 52.</p>
          </div>

          <Button variant="outline" className="w-full flex-1 flex justify-center sm:w-auto sm:flex-none">
            <div className="flex items-center gap-3">
              <FaSliders />
              <p className="font-medium">Filtros</p>
            </div>
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-8 justify-between">
          {new Array(20).fill(null).map((_, i) => <Card key={i} />)}
        </div>
      </div>
    </main>
  </>;
}