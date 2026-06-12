# Figus Traverso ⚽

Webapp para personalizar la figurita: usa el template **`bg_1.webp` tal cual**
(con todos sus logos: Coca-Cola, FIFA 26 Official Partner, escudo, sigla lateral
y Panini) y solo te deja **subir tu foto** y **editar los dos recuadros teal de
abajo** (nombre y sigla). Después la descargás como **PNG**.

Está pensada para desplegarse en **Vercel** (Next.js).

## Cómo funciona

No se recrea ni se reemplaza ningún logo. La imagen del template se muestra
intacta y por encima se superponen solo las partes editables:

- **Foto**: se sube desde el dispositivo y se recorta a la ventana rayada (con
  su esquina inferior izquierda en "gota"). Se ajusta con _zoom_ y reencuadre
  (horizontal / vertical). Si no hay foto, se ven las rayas originales del
  template.
- **Recuadro superior (nombre)**: campo de texto sobre el recuadro teal vacío.
- **Recuadro inferior (sigla)**: campo de texto sobre el recuadro que en el
  template original decía `ARG`. Ese texto fijo se borró una sola vez para dejar
  el recuadro limpio (ver más abajo) y que escribas lo que quieras.
- **Descarga**: genera un PNG en alta resolución (1602 × 2152 px) con
  `html-to-image`.

Las coordenadas de la ventana y de los recuadros se midieron píxel a píxel sobre
`bg_1.webp` (801 × 1076) y viven en `app/globals.css`.

## El template limpio (`public/template/bg.webp`)

`bg.webp` es `bg_1.webp` con una única edición: el texto `ARG` baked del recuadro
inferior se repintó con el color exacto del recuadro (`#027d8a`) para dejarlo
editable. Todo lo demás queda idéntico al original.

Si cambiás el template, regenerá `bg.webp` repitiendo esa limpieza del recuadro
inferior (o dejalo vacío) y verificá que las coordenadas en `globals.css` sigan
coincidiendo.

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

1. Subí el repo a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importá el repo.
3. Framework **Next.js** se detecta automático; no hace falta configurar nada.
4. **Deploy**.

## Estructura

```
app/
  layout.tsx          layout raíz
  page.tsx            editor (subir foto, nombre, sigla, descarga)
  globals.css         estilos de la página y del overlay del template
components/
  StickerCard.tsx     el template (bg.webp) + foto y textos editables
public/template/
  bg.webp             el template, con el recuadro inferior limpio
```

> Nota: el template incluye marcas registradas (Coca-Cola, FIFA, Panini).
> Asegurate de tener los derechos correspondientes antes de distribuir
> públicamente la app o las figuritas generadas.
