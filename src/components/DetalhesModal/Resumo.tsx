import type { Pessoa } from "@/types";
import { formatDate } from "@/utils/date";
import { FaSmile, FaTshirt } from "react-icons/fa";
import { FaAddressCard, FaEye, FaMapPin, FaPlus } from "react-icons/fa6";
import Button from "../Button";

type Props = {
  pessoa?: Pessoa
  setTab: (tab: "resumo" | "ocorrencias") => void
}

export default function Resumo({ pessoa, setTab }: Props) {
  return (
    <>
      {pessoa?.ultimaOcorrencia.dtDesaparecimento
        ? <p className="text-gray-700 mb-4">Desaparecido em {formatDate(pessoa?.ultimaOcorrencia.dtDesaparecimento)}</p>
        : <p className="text-gray-700 mb-4">Data de desaparecimento não informada.</p>}
      <div className="flex gap-2 items-center font-medium text-lg">
        <FaAddressCard />
        <p>Informações</p>
      </div>
      <p className="mb-4">{pessoa?.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao || "Sem informação"}</p>
          
      <div className="flex gap-2 items-center font-medium text-lg">
        <FaTshirt />
        <p>Vestimentas</p>
      </div>
      <p className="mb-4">{pessoa?.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido || "Sem informação"}</p>
        
      <div className="flex gap-2 items-center font-medium text-lg">
        <FaMapPin />
        <p>Local de Desaparecimento</p>
      </div>
      <p className="mb-4">{pessoa?.ultimaOcorrencia.localDesaparecimentoConcat}</p>

      {pessoa?.ultimaOcorrencia.dataLocalizacao && <div>
        <div className="flex gap-2 items-center font-medium text-lg mb-4">
          <FaSmile />
          <p>Data Localização</p>
        </div>
        <p>{formatDate(pessoa.ultimaOcorrencia.dataLocalizacao)}</p>
      </div>}

      <div className="flex gap-2 flex-wrap">
        <Button>
          <div className="flex gap-2 items-center">
            <FaPlus />
            <p className="font-medium">Adicionar Informação</p>
          </div>
        </Button>
        <Button variant="outline" onClick={() => setTab("ocorrencias")}>
          <div className="flex gap-2 items-center">
            <FaEye />
            <p className="font-medium">Ver tudo</p>
          </div>
        </Button>
      </div>
    </>
  );
}