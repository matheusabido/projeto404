import Button from "@/components/Button";
import { FaAngleLeft } from "react-icons/fa6";
import TextInput from "../input/TextInput";
import DateInput from "../input/DateInput";

type Props = {
  setTab: (tab: "resumo" | "ocorrencias" | "anexos" | "adicionar") => void
}

export default function AdicionarInformacao({ setTab }: Props) {
  return <div>
    <Button className="my-4" size="sm" variant="outline" onClick={() => setTab("resumo")}>
      <div className="flex gap-2 items-center">
        <FaAngleLeft />
        <p className="font-medium">Voltar</p>
      </div>
    </Button>
    <div className="flex flex-col gap-4">
      <TextInput label="Informação" rows={3} className="flex-1" />
      <DateInput label="Data" />
    </div>
  </div>;
}