import { useState, type CSSProperties } from "react";

type Props = {
    src?: string
    alt?: string
    style?: CSSProperties
    onLoad?: () => void
    onError?: () => void
}

export default function MoveableImage({ src, alt, style, onLoad, onError }: Props) {
  const [relativeMousePos, setRelativeMousePos] = useState<[number, number]>([.5, .5]);

  function handleMouseMove(e: React.MouseEvent) {
    const imageRect = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - imageRect.left) / imageRect.width;
    const relativeY = (e.clientY - imageRect.top) / imageRect.height;

    setRelativeMousePos([relativeX, relativeY]);
  }

  return <img
    loading="lazy"
    onLoad={onLoad}
    onError={onError}
    onMouseMove={handleMouseMove}
    onMouseLeave={() => setRelativeMousePos([.5, .5])}
    style={{
      objectPosition: `${Math.floor(relativeMousePos[0] * 100)}% ${Math.floor(relativeMousePos[1] * 100)}%`,
      ...style,
    }}
    className="w-full h-full object-cover rounded"
    src={src}
    alt={alt}
  />;
}