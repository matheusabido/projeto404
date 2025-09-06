import type { Pessoa } from "@/types";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import Button from "./Button";
import { FaEye } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import MoveableImage from "./MoveableImage";
import Badges from "./Badges";
import DefaultPhoto from "@/assets/default-photo.jpg";

type Props = {
  pessoa?: Pessoa
  className?: string
  onClick?: (pessoa: Pessoa) => void
}

export default function Card({ pessoa, className, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  return <div className={twMerge("w-80 min-w-80 shadow border border-gray-100 rounded p-4 flex flex-col", className)}>
    <div className="relative w-full h-72 rounded mb-4">
      {!(pessoa && loaded) && <div className="bg-gray-300 animate-pulse w-full h-full rounded"></div>}
      {pessoa && <MoveableImage
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        src={pessoa.urlFoto || DefaultPhoto}
        fallbackSrc={DefaultPhoto}
        alt={`Foto de ${pessoa.nome}`}
        style={{ visibility: loaded ? "visible" : "hidden" }}
      />}
      {pessoa && <div className="absolute bottom-2 right-2">
        <Button size="sm" onClick={() => onClick?.(pessoa)}>
          <div className="flex gap-2 items-center">
            <FaEye />
            <p className="font-bold">Detalhes</p>
          </div>
        </Button>
      </div>}
      {pessoa && <Badges pessoa={pessoa} />}
    </div>
    
    <div>
      {pessoa && <p className="uppercase font-medium text-lg whitespace-nowrap w-full overflow-hidden text-ellipsis">{pessoa.nome}</p>}
      {!pessoa && <div className="w-full h-6 bg-gray-300 animate-pulse rounded mb-2"></div>}
    </div>
    
    {pessoa && <div className="flex flex-col justify-between flex-1">
      <p className="mb-4 text-gray-700">Visto em {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}</p>
      <div>
        <p><strong>Idade: </strong>{pessoa.idade} anos</p>
        <p><strong>Desaparecido em:</strong> {formatDate(pessoa.ultimaOcorrencia.dtDesaparecimento)}</p>
      </div>
    </div>}
    {!pessoa && <div>
      <div className="w-full h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
      <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
    </div>}
  </div>;
}