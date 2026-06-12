"use client";

import { forwardRef } from "react";

/**
 * Figurita = el template real `bg_1.webp` (801×1076) usado tal cual.
 * Encima solo se superponen las partes editables:
 *   - la foto, recortada a la ventana rayada (esquina inferior izquierda en gota)
 *   - el recuadro superior: nombre (simple) + apellido (negrita) y debajo
 *     nacimiento | altura | peso
 *   - el recuadro inferior: club (negrita) — el texto baked ya se limpió en bg.webp
 * Ningún logo (Coca-Cola, FIFA 26, bandera, ARG lateral, Panini) se recrea.
 */

export type StickerData = {
  photoUrl: string | null;
  zoom: number;
  posX: number;
  posY: number;
  firstName: string;
  lastName: string;
  birth: string;
  height: string;
  weight: string;
  club: string;
};

type Props = { data: StickerData };

const StickerCard = forwardRef<HTMLDivElement, Props>(function StickerCard(
  { data },
  ref
) {
  const datos = [data.birth, data.height, data.weight]
    .map((s) => s.trim())
    .filter(Boolean)
    .join("  |  ");
  const sep = data.firstName && data.lastName ? " " : "";

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

      {/* recuadro superior: nombre + apellido y datos */}
      <div className="pill pill-name">
        <div className="line1">
          <span className="fn">{data.firstName}</span>
          {sep}
          <span className="ln">{data.lastName}</span>
        </div>
        {datos && <div className="line2">{datos}</div>}
      </div>

      {/* recuadro inferior: club */}
      <div className="pill pill-code">
        <span className="club">{data.club}</span>
      </div>
    </div>
  );
});

export default StickerCard;
