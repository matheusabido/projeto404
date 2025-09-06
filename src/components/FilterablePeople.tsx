import type { Paginate, Pessoa } from "@/types";
import Card from "./Card";
import Button from "./Button";
import { FaAngleLeft, FaAngleRight, FaSliders } from "react-icons/fa6";
import type { RefObject } from "react";
import FiltersModal from "./FiltersModal";
import type { Filters } from "./FiltersModal";
import { useState } from "react";

type Props = {
  data?: Paginate<Pessoa>
  ref: RefObject<HTMLDivElement | null>
  onClick?: (pessoa: Pessoa) => void
  setPage: (page: number) => void
  setFilters: (filters: Filters) => void
}

export default function FilterablePeople({ data, ref, onClick, setPage, setFilters }: Props) {
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  function handlePage(offset: number) {
    if (!data) return;
    setPage(Math.max(Math.min(data.pageable.pageNumber+offset, data.totalPages-1), 0));
  }

  return <div className="px-8 py-12" ref={ref}>
    <FiltersModal
      isOpen={filtersModalOpen}
      onClose={() => setFiltersModalOpen(false)}
      onApply={setFilters}
    />
    <div className="flex flex-wrap gap-8 justify-between md:items-center flex-col md:flex-row">
      <div>
        <p className="font-medium text-lg">Lista completa dos cadastros</p>
        {!data && <div className="h-6 w-full bg-gray-300 animate-pulse rounded"></div>}
        {data && <p className="text-gray-700">Exibindo {data.numberOfElements} resultados de {data.totalElements}. Página {data.pageable.pageNumber+1} de {data.totalPages}.</p>}
      </div>
  
      <div className="flex gap-4 flex-col-reverse md:flex-row">
        <div className="flex gap-4 items-center self-center">
          <Button size="sm" className="py-3" onClick={() => handlePage(-1)}>
            <FaAngleLeft />
          </Button>
          {data && <p className="text-gray-700">Página {data.pageable.pageNumber+1}/{data.totalPages}</p>}
          {!data && <div className="h-6 w-24 bg-gray-300 animate-pulse rounded"></div>}
          <Button size="sm" className="py-3" onClick={() => handlePage(1)}>
            <FaAngleRight />
          </Button>
        </div>
        <Button variant="outline" onClick={() => setFiltersModalOpen(true)}>
          <div className="flex items-center gap-3">
            <FaSliders />
            <p className="font-medium">Filtros</p>
          </div>
        </Button>
      </div>
    </div>
    <div className="mt-4 gap-8 flex flex-wrap">
      {!data && new Array(20).fill(null).map((_, i) => <Card className="mx-auto" key={i} />)}
      {data && data.content.map(pessoa => <Card className="mx-auto" key={pessoa.id} pessoa={pessoa} onClick={onClick} />)}
    </div>
  </div>;
}