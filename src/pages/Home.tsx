import api from "@/api";
import Button from "@/components/Button";
import Carrossel from "@/components/Carrossel";
import FilterablePeople from "@/components/FilterablePeople";
import Header from "@/components/Header";
import type { Paginate, Pessoa, Statistics } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FaSadTear, FaSearch, FaSmile } from "react-icons/fa";
import { FaDatabase, FaTv } from "react-icons/fa6";

export default function HomePage() {
  const buscarSectionRef = useRef<HTMLDivElement>(null);
  
  // TODO: Toast
  // TODO: Modal
  // TODO: Tratar erros
  // TODO: Modo TV
  // TODO: Melhorar carrossel?
  const { data: pessoasDinamico, isError: pessoasDinamicoError } = useQuery({
    queryKey: ["pessoas-dinamico"],
    queryFn: () => api.get<Pessoa[]>("/pessoas/aberto/dinamico?registros=12"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: pessoasFiltro, isError: pessoasFiltroError } = useQuery({
    queryKey: ["pessoas-filtro"],
    queryFn: () => api.get<Paginate<Pessoa>>("/pessoas/aberto/filtro?porPagina=20"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: stats, isError: statsError } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get<Statistics>("/pessoas/aberto/estatistico"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return <>
    <Header />
    <div className="mx-8 py-16 border-b border-gray-300 flex justify-between items-center flex-col md:flex-row gap-16">
      <div>
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
      <div>
        <div>
          <p className="text-xl mb-4 text-center font-medium">Pessoas nesse momento</p>
          <div className="flex gap-16">
            <div>
              <p className="text-4xl font-bold flex gap-2 items-center">
                <FaSadTear className="text-3xl" />
                {stats?.data.quantPessoasDesaparecidas}
              </p>
              <p className="text-gray-700 -mt-1">desaparecidas</p>
            </div>
            <div className="text-end">
              <p className="text-4xl font-bold flex gap-2 items-center">
                {stats?.data.quantPessoasEncontradas}
                <FaSmile className="text-3xl" />
              </p>
              <p className="text-gray-700 -mt-1">encontradas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main>
      <div className="border-b border-gray-300 mx-8 py-8">
        <p className="mt-4 font-medium text-xl">Você viu alguma dessas pessoas?</p>
        <Carrossel data={pessoasDinamico?.data} />
      </div>

      <FilterablePeople data={pessoasFiltro?.data} ref={buscarSectionRef} />
    </main>
  </>;
}