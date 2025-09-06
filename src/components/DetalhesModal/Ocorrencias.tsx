import type { Informacao } from "@/types";
import { FaAngleLeft } from "react-icons/fa6";
import Button from "@/components/Button";
import { useMemo } from "react";
import { formatDate } from "@/utils/date";

type Props = {
  data?: Informacao[]
  setTab: (tab: "resumo" | "ocorrencias" | "anexos" | "adicionar") => void
  setAnexos: (anexos: string[]) => void
}

export default function Ocorrencias({ data, setTab, setAnexos }: Props) {
  const groupedData = useMemo(() => {
    return data?.reduce((a, b) => ({ ...a, [b.data]: [...(a[b.data] || []), b] }), {} as Record<string, Informacao[]>);
  }, [data]);

  const orderedDates = useMemo(() => {
    return groupedData ? Object.keys(groupedData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) : [];
  }, [groupedData]);

  return (
    <div>
      <Button className="my-4" size="sm" variant="outline" onClick={() => setTab("resumo")}>
        <div className="flex gap-2 items-center">
          <FaAngleLeft />
          <p className="font-medium">Voltar</p>
        </div>
      </Button>
      
      {!data?.length && <p>Nenhuma informação encontrada.</p>}
      {groupedData && orderedDates.map((date, j) => {
        const data = groupedData[date];
        if (!data) return undefined;

        return <div key={j} className="mb-4">
          <p className="text-lg font-medium mb-2">{formatDate(date)}</p>
          {data.map((info, i) => (
            <div key={`${j}-${i}`} className="border border-gray-300 rounded p-2 mb-2">
              <p>{info.informacao}</p>
              {!!info.anexos?.length && <p onClick={() => {
                setTab("anexos");
                setAnexos(info.anexos!);
              }} className="text-sm text-indigo-600 underline mt-1 cursor-pointer">Clique aqui para ver os anexos.</p>}
              {!info.anexos?.length && <p className="text-sm text-gray-600 mt-1">Essa informação não tem anexos.</p>}
            </div>
          ))}
        </div>;
      }).filter((a) => a)}
    </div>
  );
}