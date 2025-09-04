import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import { FaSliders } from "react-icons/fa6";

export default function BuscarPage() {
  return <>
    <Header />
    <main className="p-8">
      <div className="flex items-center justify-between">
        <p className="text-gray-900">Exibindo 20 resultados de 413. Página 01 de 52.</p>
        <Button variant="outline">
          <div className="flex items-center gap-3">
            <FaSliders />
            <p className="font-medium">Filtros</p>
          </div>
        </Button>
      </div>
      <div className="">
        {new Array(20).fill(null).map((_, i) => <Card key={i} />)}
      </div>
    </main>
  </>;
}