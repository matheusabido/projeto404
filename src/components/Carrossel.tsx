import type { Pessoa } from "@/types";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useRef, useState } from "react";

type Props = {
  data?: Pessoa[]
  onClick?: (pessoa: Pessoa) => void
}

export default function Carrossel({ data, onClick }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);
  const [margin, setMargin] = useState<number>(0);

  function canSlideRight() {
    if (!wrapperRef.current) return false;
    const rect = wrapperRef.current.parentElement?.getBoundingClientRect();
    if (!rect) return false;

    const lastRect = wrapperRef.current.children[wrapperRef.current.children.length - 1].getBoundingClientRect();
    return rect.right < lastRect.right;
  }

  function handleLeft() {
    const minOffset = 0;
    const newOffset = Math.max(minOffset, offset - 1);
    setMargin(newOffset * 300);
    setOffset(newOffset);
  }

  function handleRight() {
    if (!canSlideRight()) return;
    const newOffset = offset + 1;
    setMargin(newOffset * 300);
    setOffset(newOffset);
  }

  return (
    <div className="relative">
      <button onClick={handleLeft} className="text-2xl bg-white p-2 rounded-full shadow border opacity-90 border-gray-300 z-10 absolute top-1/2 left-2 -translate-1/2 hover:opacity-100 transition-all cursor-pointer">
        <FaAngleLeft />
      </button>
      <button onClick={handleRight} className="text-2xl bg-white p-2 rounded-full shadow border opacity-90 border-gray-300 z-10 absolute top-1/2 right-2 -translate-1/2 hover:opacity-100 transition-all cursor-pointer">
        <FaAngleRight />
      </button>
      <div
        className="flex gap-4 overflow-hidden py-4 mb-4"
        ref={wrapperRef}
        style={{ marginLeft: `-${margin}px`, transition: "margin-left 0.3s" }}
      >
        {data?.map((pessoa) => (
          <Card key={pessoa.id} pessoa={pessoa} onClick={onClick} />
        ))}
        {!data && new Array(12).fill(null).map((_, i) => <Card key={i} />)}
      </div>
    </div>
  );
}