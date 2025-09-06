import { type Informacao, type Pessoa } from "@/types";
import Modal from "../Modal";
import MoveableImage from "../MoveableImage";
import Badges from "../Badges";
import DefaultPhoto from "@/assets/default-photo.jpg";
import { useQuery } from "@tanstack/react-query";
import api from "@/api";
import Resumo from "./Resumo";
import { useEffect, useState } from "react";
import Ocorrencias from "./Ocorrencias";
import { useToast } from "@/contexts/ToastContext";
import Anexos from "./Anexos";
import AdicionarInformacao from "./AdicionarInformacao";

type Props=  {
  pessoa?: Pessoa
  onClose?: () => void
}

export default function DetalhesModal({ pessoa, onClose }: Props) {
  const [tab, setTab] = useState<"resumo" | "ocorrencias" | "anexos" | "adicionar">("resumo");
  const [anexos, setAnexos] = useState<string[]>();

  const { addToast } = useToast();

  const { data, isError } = useQuery({
    queryKey: ["ocorrencia", pessoa?.ultimaOcorrencia.ocoId],
    queryFn: async () => {
      if (!pessoa?.ultimaOcorrencia.ocoId) return null;
      return api.get<Informacao[]>(`/ocorrencias/informacoes-desaparecido?ocorrenciaId=${pessoa.ultimaOcorrencia.ocoId}`);
    },
    enabled: !!pessoa?.id,
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      addToast({
        type: "error",
        title: "Erro",
        message: "Não foi possível carregar as informações.",
      });
    }
  }, [addToast, isError]);

  return (
    <Modal isOpen={!!pessoa} onClose={onClose} title="Detalhes">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="h-100 flex-1 relative md:sticky md:top-0">
          <Badges pessoa={pessoa} />
          {pessoa && <MoveableImage src={pessoa?.urlFoto || DefaultPhoto} alt={`Foto de ${pessoa?.nome}`} fallbackSrc={DefaultPhoto} />}
        </div>
        <div className="flex-2">
          <p className="font-medium text-xl">{pessoa?.nome}</p>
          <p className="text-gray-700">{pessoa?.idade} anos</p>
          {tab === "resumo" && <Resumo pessoa={pessoa} setTab={setTab} />}
          {tab === "adicionar" && <AdicionarInformacao setTab={setTab} />}
          {tab === "ocorrencias" && <Ocorrencias data={data?.data} setTab={setTab} setAnexos={setAnexos} />}
          {tab === "anexos" && <Anexos setTab={setTab} data={anexos} />}
        </div>
      </div>
    </Modal>
  );
}