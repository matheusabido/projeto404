import type { Pessoa } from "@/types";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import Button from "./Button";
import { FaEye } from "react-icons/fa6";
import { MdFemale, MdMale } from "react-icons/md";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Props = {
  pessoa?: Pessoa
  className?: string
}

export default function Card({ pessoa, className }: Props) {
  const [relativeMousePos, setRelativeMousePos] = useState<[number, number]>([.5, .5]);
  const [loaded, setLoaded] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    const imageRect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - imageRect.left) / imageRect.width;
    const relativeY = (e.clientY - imageRect.top) / imageRect.height;

    setRelativeMousePos([relativeX, relativeY]);
  }
  
  return <div className={twMerge("w-80 min-w-80 shadow border border-gray-100 rounded p-4 flex flex-col", className)}>
    <div className="relative w-full h-72 rounded mb-4">
      {!(pessoa && loaded) && <div className="bg-gray-300 animate-pulse w-full h-full rounded"></div>}
      {pessoa && <img
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRelativeMousePos([.5, .5])}
        style={{
          objectPosition: `${Math.floor(relativeMousePos[0] * 100)}% ${Math.floor(relativeMousePos[1] * 100)}%`,
          visibility: loaded ? "visible" : "hidden",
        }}
        className="w-full h-full object-cover rounded"
        src={pessoa.urlFoto}
        alt={`Foto de ${pessoa.nome}`}
      />}
      {pessoa && <div className="absolute bottom-2 right-2">
        <Button size="sm">
          <div className="flex gap-2 items-center">
            <FaEye />
            <p className="font-bold">Detalhes</p>
          </div>
        </Button>
      </div>}
      {pessoa && <div className="absolute top-2 right-2 flex gap-1">
        <div className={clsx(
          "font-semibold text-sm text-white px-2 py-1 rounded",
          pessoa.vivo ? "bg-green-500" : "bg-red-500",
        )}>
          {pessoa.vivo ? "Vivo" : "Morto"}
        </div>

        <div className={clsx(
          "text-xl text-white p-1 rounded",
          pessoa.sexo === "MASCULINO" ? "bg-blue-500" : "bg-pink-500",
        )}>
          {pessoa.sexo === "MASCULINO" ? <MdMale /> : <MdFemale />}
        </div>
      </div>}
    </div>
    
    <div>
      {pessoa && <p className="uppercase font-medium text-lg whitespace-nowrap w-full overflow-hidden text-ellipsis">{pessoa.nome}</p>}
      {!pessoa && <div className="w-full h-6 bg-gray-300 animate-pulse rounded"></div>}
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