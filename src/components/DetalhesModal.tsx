import type { Pessoa } from "@/types";
import Modal from "./Modal";
import MoveableImage from "./MoveableImage";
import { formatDate } from "@/utils/date";
import { FaAddressCard, FaMapPin } from "react-icons/fa6";
import { FaSmile, FaTshirt } from "react-icons/fa";
import Badges from "./Badges";

type Props=  {
  pessoa?: Pessoa
  onClose?: () => void
}

export default function DetalhesModal({ pessoa, onClose }: Props) {
  return (
    <Modal isOpen={!!pessoa} onClose={onClose} title="Detalhes">
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="h-100 flex-1 relative">
          <Badges pessoa={pessoa} />
          <MoveableImage src={pessoa?.urlFoto} alt={`Foto de ${pessoa?.nome}`} />
        </div>
        <div className="flex-2">
          <p className="font-medium text-xl">{pessoa?.nome}</p>
          <p className="text-gray-700">{pessoa?.idade} anos</p>
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
            <div className="flex gap-2 items-center font-medium text-lg">
              <FaSmile />
              <p>Data Localização</p>
            </div>
            <p>{formatDate(pessoa.ultimaOcorrencia.dataLocalizacao)}</p>
          </div>}
        </div>
      </div>
    </Modal>
  );
}