# lmdiagram

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/lmdiagram.svg)](https://www.npmjs.com/package/lmdiagram)

React component for **linked-model** diagrams (draggable nodes and **associations** drawn as SVG curves). It exposes a small data-model API (`DiagramModel`, `AssociationModel`, `ControllerLM`) and a themeable UI via CSS variables.

**Current version:** 0.2.x · React 17+ (peer dependency)

---
<img width="1035" height="507" alt="image" src="https://github.com/user-attachments/assets/1e255ae6-76f0-4aaa-9cca-6601ec7d47d9" />

## Installation

```bash
npm install lmdiagram
```

Make sure React is installed in your app:

```bash
npm install react react-dom
```

## Quick start

```jsx
import { LMDiagram } from 'lmdiagram';
import 'lmdiagram/styles.css';

export function App() {
  return <LMDiagram />;
}
```

`LMDiagram` ships with a built-in sample (three models and two links). For your own graph, pass `buildDiagram` (ideally wrapped in `useCallback` so the controller is not recreated every render).

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
    const a = new DiagramModel('Source', 'Detail A');
    a.setPosition(120, 80);
    const b = new DiagramModel('Target', 'Detail B');
    b.setPosition(120, 280);

    const assoc = new AssociationModel();
    assoc.setLink(a, b, 'My label'); // optional third argument: label along the path

    const controller = new ControllerLM();
    controller.setAssociations(assoc);
    return controller;
  }, []);

  return <LMDiagram buildDiagram={buildDiagram} />;
}
```

## Exports

| Export | Description |
|--------|-------------|
| `LMDiagram` | Main component. Props: `className`, optional `buildDiagram`. |
| `ModalDiagrama` | Alias for `LMDiagram` (deprecated). |
| `DiagramModel` | Node: `header`, `body`, `setPosition(top, left)`, `width`, `height`, etc. |
| `AssociationModel` | `setLink(modelA, modelB, optionalLabel)` — links and optional SVG label. |
| `ControllerLM` | `setAssociations(association)` — wrapper consumed by the diagram. |

## Styling

Styles ship with `lmdiagram/styles.css`. Customize from a parent container using CSS variables, for example:

```css
.my-wrapper {
  --lm-header: linear-gradient(135deg, #0d9488, #14b8a6);
  --lm-line: #0d9488;
  --lm-link-label: #115e59;
  --lm-link-label-stroke: #ffffff;
}
```

## Developing this repo

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (Vite demo). |
| `npm run build` | Build the library to `dist/` (ESM + CJS + CSS). |
| `npm run build:demo` | Static demo build to `demo-dist/`. |
| `npm run preview` | Preview the last demo build. |

## License

MIT

---

