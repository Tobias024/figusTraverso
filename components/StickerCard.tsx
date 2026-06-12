"use client";

import { forwardRef } from "react";

/**
 * Figurita = el template real `bg_1.webp` (801×1076) usado tal cual.
 * Encima solo se superponen las partes editables:
 *   - la foto, recortada a la ventana rayada (esquina inferior izquierda en gota)
 *   - el recuadro superior (nombre)
 *   - el recuadro inferior (sigla, ej. "ARG") — el texto baked ya se limpió en bg.webp
 * Ningún logo (Coca-Cola, FIFA 26, escudo, ARG lateral, Panini) se recrea ni se toca.
 */

export type StickerData = {
  photoUrl: string | null;
  zoom: number;
  posX: number;
  posY: number;
  name: string;
  code: string;
};

type Props = { data: StickerData };

const StickerCard = forwardRef<HTMLDivElement, Props>(function StickerCard(
  { data },
  ref
) {
  return (
    <div className="card" ref={ref}>
      {/* template base — la imagen tal cual, con todos sus logos */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="card-bg" src="/template/bg.webp" alt="" />

      {/* foto editable, recortada a la ventana rayada */}
      <div className="window">
        {data.photoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className="photo"
            src={data.photoUrl}
            alt=""
            style={{
              objectPosition: `${data.posX}% ${data.posY}%`,
              transform: `scale(${data.zoom})`,
            }}
          />
        ) : (
          <div className="window-hint">
            <span>Subí una foto</span>
          </div>
        )}
      </div>

      {/* recuadro superior: nombre (texto sobre el recuadro teal del template) */}
      <div className="pill pill-name">
        <span>{data.name}</span>
      </div>

      {/* recuadro inferior: sigla (texto sobre el recuadro limpiado) */}
      <div className="pill pill-code">
        <span>{data.code}</span>
      </div>
    </div>
  );
});

export default StickerCard;
