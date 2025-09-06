import Button from "@/components/Button";
import { useToast } from "@/contexts/ToastContext";
import { FaAngleLeft } from "react-icons/fa6";

type Props = {
  setTab: (tab: "resumo" | "ocorrencias" | "anexos" | "adicionar") => void
  data?: string[]
}

export default function Anexos({ data, setTab }: Props) {
  const { addToast } = useToast();

  return (
    <div>
      <Button className="my-4" size="sm" variant="outline" onClick={() => setTab("ocorrencias")}>
        <div className="flex gap-2 items-center">
          <FaAngleLeft />
          <p className="font-medium">Voltar</p>
        </div>
      </Button>
      {!data?.length && <p>Nenhum anexo encontrado.</p>}
      {data?.map((anexo, i) => (
        <div key={i} className="mb-4">
          <img src={anexo} alt={`Anexo ${i + 1}`} onError={() => addToast({ type: "error", title: "Erro!", message: `Não foi possível carregar o Anexo ${i+1}` })} className="max-w-full h-auto border border-gray-300 rounded" />
        </div>
      ))}
    </div>
  );
}