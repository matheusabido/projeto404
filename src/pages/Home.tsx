import Button from "@/components/Button";
import DateInput from "@/components/input/DateInput";
import TextInput from "@/components/input/TextInput";
import { FaSearch } from "react-icons/fa";

export default function HomePage() {
  return <main className="p-4">
    <p className="font-medium text-xl">Você viu essa pessoa?</p>
    <DateInput label="Label Exemplo" />
    <div className="flex gap-2 items-end">
      <TextInput label="Label Exemplo" />
      <Button>
        <span className="flex items-center gap-2">
          <FaSearch /> Pesquisar
        </span>
      </Button>
    </div>
  </main>;
}