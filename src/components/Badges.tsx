import type { Pessoa } from "@/types";
import clsx from "clsx";
import { MdFemale, MdMale } from "react-icons/md";

type Props = {
    pessoa?: Pessoa
}

export default function Badges({ pessoa }: Props) {
  return (
    <div className="absolute w-full top-0 left-0 p-2 justify-between flex gap-1 pointer-events-none">
      <div>
        <div className={clsx(
          "font-semibold text-sm text-white px-2 py-1 rounded",
          pessoa?.ultimaOcorrencia.dataLocalizacao ? "bg-blue-500" : "bg-red-500",
        )}>
          {pessoa?.ultimaOcorrencia.dataLocalizacao ? "Localizado" : "Desaparecido"}
        </div>
      </div>
      <div className="flex gap-1">
        <div className={clsx(
          "font-semibold text-sm text-white px-2 py-1 rounded",
          pessoa?.vivo ? "bg-green-500" : "bg-red-500",
        )}>
          {pessoa?.vivo ? "Vivo" : "Morto"}
        </div>
                          
        <div className={clsx(
          "text-xl text-white p-1 rounded",
          pessoa?.sexo === "MASCULINO" ? "bg-blue-500" : "bg-pink-500",
        )}>
          {pessoa?.sexo === "MASCULINO" ? <MdMale /> : <MdFemale />}
        </div>
      </div>
    </div>
  );
}