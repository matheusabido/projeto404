import api from "@/api";
import Header from "@/components/Header";
import type { Pessoa } from "@/types";
import { useQuery } from "@tanstack/react-query";
import MoveableImage from "@/components/MoveableImage";
import DefaultPhoto from "@/assets/default-photo.jpg";
import { useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";

export default function ModoTVPage() {
  const { addToast } = useToast();
  
  const { data, isError } = useQuery({
    queryKey: ["pessoas-dinamico"],
    queryFn: () => api.get<Pessoa[]>("/pessoas/aberto/dinamico?registros=12"),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchInterval: 5000,
    retry: 2,
  });

  useEffect(() => {
    if (isError) {
      addToast({ type: "error", title: "Erro!", message: "Erro ao carregar os dados. Tente novamente mais tarde." });
    }
  }, [isError, addToast]);

  return <>
    <Header />
    <div className="grid grid-cols-4 grid-rows-3 h-dvh bg-black">
      {data?.data.map((pessoa) => (
        <div className="relative w-full h-full" key={pessoa.id}>
          <MoveableImage key={pessoa.id} fallbackSrc={DefaultPhoto} src={pessoa.urlFoto || DefaultPhoto} alt={pessoa.nome} />
          <div className="absolute left-0 bottom-0 w-full h-16 bg-gradient-to-t from-black to-transparent flex items-end">
            <p className="p-4 text-white font-bold text-xl">{pessoa.nome}</p>
          </div>
        </div>
      ))}
    </div>
  </>;
}