import Modal from "@/components/Modal";
import TextInput, { type TextInputRef } from "@/components/input/TextInput";
import NumberInput, { type NumberInputRef } from "@/components/input/NumberInput";
import Button from "@/components/Button";
import Select, { type SelectRef } from "@/components/input/Select";
import { useRef } from "react";

export type Filters = {
  nome?: string;
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
  sexo?: "MASCULINO" | "FEMININO";
  status?: "LOCALIZADO" | "DESAPARECIDO";
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
};

export default function FiltersModal({ isOpen, onClose, onApply }: Props) {
  const nomeRef = useRef<TextInputRef>(null);
  const faixaIdadeInicialRef = useRef<NumberInputRef>(null);
  const faixaIdadeFinalRef = useRef<NumberInputRef>(null);
  const sexoRef = useRef<SelectRef>(null);
  const statusRef = useRef<SelectRef>(null);

  function handleApply() {
    onApply({
      nome: nomeRef.current?.value || undefined,
      faixaIdadeInicial: faixaIdadeInicialRef.current?.value ? Number(faixaIdadeInicialRef.current.value) : undefined,
      faixaIdadeFinal: faixaIdadeFinalRef.current?.value ? Number(faixaIdadeFinalRef.current.value) : undefined,
      sexo: sexoRef.current?.value as Filters["sexo"] || undefined,
      status: statusRef.current?.value as Filters["status"] || undefined,
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filtros">
      <div className="flex flex-col gap-4 p-4">
        <TextInput
          ref={nomeRef}
          label="Nome"
        />
        <div className="flex gap-4">
          <NumberInput
            ref={faixaIdadeInicialRef}
            label="Faixa Idade Inicial"
          />
          <NumberInput
            ref={faixaIdadeFinalRef}
            label="Faixa Idade Final"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <Select ref={sexoRef} label="Sexo">
              <option value="">Todos</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </Select>
          </div>
          <div className="flex flex-col flex-1">
            <Select ref={statusRef} label="Status">
              <option value="">Todos</option>
              <option value="LOCALIZADO">Localizado</option>
              <option value="DESAPARECIDO">Desaparecido</option>
            </Select>
          </div>
        </div>
        <Button className="mt-4" onClick={handleApply}>
          Aplicar Filtros
        </Button>
      </div>
    </Modal>
  );
}
