# lmdiagram

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/lmdiagram.svg)](https://www.npmjs.com/package/lmdiagram)

Componente React para diagramas con **modelos enlazados** (nodos arrastrables y **asociaciones** con curvas SVG). Incluye API basada en clases de datos (`DiagramModel`, `AssociationModel`, `ControllerLM`) y una UI actualizable con variables CSS.

**Versión actual:** 0.2.x · React 17+ (peer dependency)

---

## Instalación

```bash
npm install lmdiagram
```

Asegúrate de tener React en tu proyecto:

```bash
npm install react react-dom
```

## Uso rápido

```jsx
import { LMDiagram } from 'lmdiagram';
import 'lmdiagram/styles.css';

export function App() {
  return <LMDiagram />;
}
```

El componente `LMDiagram` incluye un ejemplo por defecto (tres modelos y dos enlaces). Para un grafo propio, usa `buildDiagram` (idealmente con `useCallback` para no recrear el objeto en cada render).

```jsx
import { useCallback } from 'react';
import {
  LMDiagram,
  DiagramModel,
  AssociationModel,
  ControllerLM,
} from 'lmdiagram';
import 'lmdiagram/styles.css';

export function App() {
  const buildDiagram = useCallback(() => {
    const a = new DiagramModel('Origen', 'Detalle A');
    a.setPosition(120, 80);
    const b = new DiagramModel('Destino', 'Detalle B');
    b.setPosition(120, 280);

    const assoc = new AssociationModel();
    assoc.setLink(a, b, 'Mi etiqueta'); // tercer argumento opcional: texto sobre el trazo

    const controller = new ControllerLM();
    controller.setAssociations(assoc);
    return controller;
  }, []);

  return <LMDiagram buildDiagram={buildDiagram} />;
}
```

## API exportada

| Export            | Descripción |
|-------------------|-------------|
| `LMDiagram`       | Componente principal. Props: `className`, `buildDiagram` (opcional). |
| `ModalDiagrama`   | Alias de `LMDiagram` (deprecado). |
| `DiagramModel`    | Nodo: `header`, `body`, `setPosition(top, left)`, `width`, `height`, etc. |
| `AssociationModel` | `setLink(modeloA, modeloB, etiquetaOpcional)` — enlaces y etiqueta en SVG. |
| `ControllerLM`    | `setAssociations(association)` — contenedor que usa el diagrama. |

## Estados y estilos

Los estilos viven en `lmdiagram/styles.css`. Puedes personalizar el aspecto desde un contenedor padre usando variables CSS, por ejemplo:

```css
.mi-contenedor {
  --lm-header: linear-gradient(135deg, #0d9488, #14b8a6);
  --lm-line: #0d9488;
  --lm-link-label: #115e59;
  --lm-link-label-stroke: #ffffff;
}
```

## Desarrollo en este repositorio

| Comando        | Descripción |
|----------------|-------------|
| `npm run dev`    | Servidor de desarrollo (demo con Vite). |
| `npm run build`  | Genera la librería en `dist/` (ESM + CJS + CSS). |
| `npm run build:demo` | Build estático de la demo en `demo-dist/`. |
| `npm run preview` | Previsualiza el último build de demo. |

Antes de publicar en npm, `prepublishOnly` ejecuta automáticamente `npm run build`.

## Publicar en npm

1. `npm login`
2. `npm version patch` (o `minor` / `major`)
3. `npm publish`

Comprueba que el nombre `lmdiagram` esté libre o usa un nombre con scope, por ejemplo `@tu-usuario/lmdiagram`.

## Licencia

MIT

---

*Capturas o GIF antiguos del proyecto pueden aparecer en issues; la demo actual se ejecuta con `npm run dev`.*
