# Figus Traverso ⚽

Webapp para crear figuritas personalizadas estilo álbum mundialista: subís una
foto, completás los datos (nombre, país, altura, peso, posición, etc.) sobre un
template limpio y descargás el resultado como **PNG**.

Está pensada para desplegarse en **Vercel** (Next.js).

## Cómo funciona

El marco de la figurita (bordes, logo, íconos de estadísticas, banda de nombre,
bandera y escudo) está reconstruido en código sobre un template **limpio**, sin
la foto ni los valores originales. El usuario sólo coloca su foto y completa los
campos por encima:

- **Foto**: se sube desde el dispositivo y se ajusta con _zoom_ y reencuadre
  (horizontal / vertical).
- **Campos de texto**: sigla del país, país, nombre, altura, peso y posición.
- **Opcional**: reemplazar la bandera y el escudo por imágenes propias.
- **Descarga**: genera un PNG en alta resolución (1086 × 1448 px) con
  `html-to-image`.

Los íconos de estadísticas (altura / peso / posición) se dibujan con SVG. El
logo, la bandera y el escudo viven en `public/template/` y se pueden reemplazar
por los tuyos.

## Desarrollo local

```bash
npm install
npm run dev
# abrir http://localhost:3000
```

## Build de producción

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Subí el repo a GitHub (ya está en la rama del proyecto).
2. En [vercel.com](https://vercel.com) → **New Project** → importá el repo.
3. Framework **Next.js** se detecta automático; no hace falta configurar nada.
4. **Deploy**.

## Estructura

```
app/
  layout.tsx        layout raíz
  page.tsx          editor (subir foto, formularios, descarga)
  globals.css       estilos de la página y de la figurita
components/
  StickerCard.tsx   la figurita (marco + foto + campos)
  StatIcons.tsx     íconos SVG de altura / peso / posición
public/template/
  logo.png          logo superior
  flag.png          bandera por defecto
  badge.png         escudo por defecto
```

## Personalizar el template

- Cambiá `public/template/logo.png`, `flag.png` o `badge.png` por tus imágenes.
- Ajustá colores, tamaños y posiciones en `app/globals.css` (sección
  `The sticker card`).

> Nota: las imágenes del template (`public/template/`) se derivan de la imagen
> que aportaste. Asegurate de tener los derechos correspondientes antes de
> distribuir públicamente la app o las figuritas generadas.
