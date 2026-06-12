"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import StickerCard, { StickerData } from "@/components/StickerCard";

// Tamaño nativo del template bg_1.webp
const CARD_W = 801;
const CARD_H = 1076;
// Ancho de visualización de la tarjeta (debe coincidir con .preview-col en CSS)
const PREVIEW_W = 380;

const DEFAULTS: StickerData = {
  photoUrl: null,
  zoom: 1,
  posX: 50,
  posY: 50,
  firstName: "LIONEL",
  lastName: "MESSI",
  birth: "24-6-1987",
  height: "1,70 m",
  weight: "72 kg",
  club: "INTER MIAMI CF (USA)",
};

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Home() {
  const [data, setData] = useState<StickerData>(DEFAULTS);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof StickerData>(key: K, value: StickerData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  // La tarjeta se muestra a un ancho fijo cómodo (≤380px) para que quepa al
  // lado de los controles; en pantallas chicas se achica al ancho disponible.
  useEffect(() => {
    const update = () => {
      const content = Math.min(window.innerWidth, 1080) - 36;
      const target = Math.min(PREVIEW_W, content);
      setScale(target / CARD_W);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readFile(file);
    setData((d) => ({ ...d, photoUrl: url, zoom: 1, posX: 50, posY: 50 }));
  };

  const download = useCallback(async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        width: CARD_W,
        height: CARD_H,
      });
      const link = document.createElement("a");
      const safe = `${data.firstName} ${data.lastName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      link.download = `figurita-${safe || "figurita"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("No se pudo generar el PNG. Probá de nuevo.");
    } finally {
      setBusy(false);
    }
  }, [data.firstName, data.lastName]);

  return (
    <main className="page">
      <h1>Figus Traverso ⚽</h1>
      <p className="sub">
        Subí tu foto, escribí el nombre y la sigla, y descargá tu figurita en PNG.
      </p>

      <div className="layout">
        {/* PREVIEW */}
        <div className="preview-col">
          <div
            className="preview"
            style={{
              transform: `scale(${scale})`,
              width: CARD_W * scale,
              height: CARD_H * scale,
            }}
          >
            <StickerCard ref={cardRef} data={data} />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="controls">
          <label className="file-btn">
            📷 {data.photoUrl ? "Cambiar foto" : "Subir foto"}
            <input type="file" accept="image/*" onChange={onPhoto} />
          </label>

          {data.photoUrl && (
            <>
              <div className="slider-field">
                <label>
                  <span>Zoom</span>
                  <span>{data.zoom.toFixed(2)}x</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={data.zoom}
                  onChange={(e) => set("zoom", Number(e.target.value))}
                />
              </div>
              <div className="row">
                <div className="slider-field" style={{ flex: 1 }}>
                  <label>
                    <span>Horizontal</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={data.posX}
                    onChange={(e) => set("posX", Number(e.target.value))}
                  />
                </div>
                <div className="slider-field" style={{ flex: 1 }}>
                  <label>
                    <span>Vertical</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={data.posY}
                    onChange={(e) => set("posY", Number(e.target.value))}
                  />
                </div>
              </div>
            </>
          )}

          <div className="divider" />

          <div className="row">
            <div className="field">
              <label>Nombre</label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Apellido</label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Nacimiento</label>
              <input
                type="text"
                value={data.birth}
                onChange={(e) => set("birth", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Altura</label>
              <input
                type="text"
                value={data.height}
                onChange={(e) => set("height", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Peso</label>
              <input
                type="text"
                value={data.weight}
                onChange={(e) => set("weight", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Club (recuadro inferior)</label>
            <input
              type="text"
              value={data.club}
              onChange={(e) => set("club", e.target.value)}
            />
          </div>

          <button
            className="download"
            onClick={download}
            disabled={busy || !data.photoUrl}
          >
            {busy ? "Generando…" : "⬇️ Descargar PNG"}
          </button>
          {!data.photoUrl && (
            <p className="hint">Subí una foto para habilitar la descarga.</p>
          )}
        </div>
      </div>
    </main>
  );
}
