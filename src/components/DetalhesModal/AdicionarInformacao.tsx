import Button from "@/components/Button";
import { FaAngleLeft } from "react-icons/fa6";
import TextInput, { type TextInputRef } from "@/components/input/TextInput";
import DateInput, { type DateInputRef } from "@/components/input/DateInput";
import FileInput, { type FileInputRef } from "@/components/input/FileInput";
import { useRef, useState } from "react";
import api from "@/api";
import { useToast } from "@/contexts/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  ocorrenciaId?: number
  setTab: (tab: "resumo" | "ocorrencias" | "anexos" | "adicionar") => void
}

export default function AdicionarInformacao({ ocorrenciaId, setTab }: Props) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const informacaoRef = useRef<TextInputRef>(null);
  const dateRef = useRef<DateInputRef>(null);
  const fileRef = useRef<FileInputRef>(null);

  const [informacaoError, setInformacaoError] = useState("");
  const [dateError, setDateError] = useState("");

  const queryClient = useQueryClient();

  async function handleSend() {
    if (loading || !ocorrenciaId) return;
    setLoading(true);

    const informacao = informacaoRef.current?.value;
    const date = dateRef.current?.value;
    const file = fileRef.current?.value;

    if (!validate(informacao, date)) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("ocoId", ocorrenciaId.toString());
    data.append("informacao", informacao!.trim());
    data.append("data", date!.trim());
    if (file) data.append("files", file);

    try {
      await api.postForm("/ocorrencias/informacoes-desaparecido", data);
      queryClient.invalidateQueries({ queryKey: ["ocorrencia", ocorrenciaId] });
      addToast({ type: "success", title: "Sucesso!", message: "Informação adicionada com sucesso." });
      setTab("resumo");
    } catch {
      addToast({ type: "error", title: "Erro!", message: "Ocorreu um erro ao tentar adicionar informação. Por favor, tente novamente mais tarde." });
    } finally {
      setLoading(false);
    }
  }

  function validate(informacao?: string, date?: string) {
    setInformacaoError("");
    setDateError("");

    let valid = true;

    if (!informacao?.trim()) {
      setInformacaoError("A informação é obrigatória");
      valid = false;
    } else if (informacao.trim().length < 5) {
      setInformacaoError("A informação deve ter ao menos 5 caracteres");
      valid = false;
    }

    if (!date?.trim()) {
      setDateError("A data é obrigatória");
      valid = false;
    } else if (!new Date(date).getDate()) {
      setDateError("Data inválida");
      valid = false;
    }

    return valid;
  }

  return <div>
    <Button className="my-4" size="sm" variant="outline" onClick={() => setTab("resumo")}>
      <div className="flex gap-2 items-center">
        <FaAngleLeft />
        <p className="font-medium">Voltar</p>
      </div>
    </Button>
    <div className="flex flex-col gap-4">
      <div>
        <TextInput ref={informacaoRef} label="Informação" rows={3} className="flex-1" />
        {informacaoError && <p className="text-sm text-red-600 mt-1">{informacaoError}</p>}
      </div>
      <div>
        <DateInput ref={dateRef} label="Data" />
        {dateError && <p className="text-sm text-red-600 mt-1">{dateError}</p>}
      </div>
      <FileInput ref={fileRef} label="Anexar arquivo" />
      <Button className="font-bold" loading={loading} onClick={handleSend}>
        Enviar
      </Button>
    </div>
  </div>;
}