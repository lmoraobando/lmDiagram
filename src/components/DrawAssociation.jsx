import { useEffect, useRef, useCallback } from 'react';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Punto en curva cúbica de Bézier en t ∈ [0,1] (mismo trazo que el path) */
function cubicBezierPoint(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

function DrawAssociation({ associationModel }) {
  const associationRef = useRef(associationModel);
  associationRef.current = associationModel;

  const updateConnection = useCallback((pAssocModel) => {
    if (!pAssocModel?.AssociationModel) return;

    for (const lineItem of pAssocModel.AssociationModel) {
      const Model1 = document.getElementById(lineItem.from);
      const Model2 = document.getElementById(lineItem.to);
      if (!Model1 || !Model2) continue;

      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;

      const lineIdNum = parseInt(lineItem.line_Associate_id?.substring(7) ?? '0', 10);
      if (lineIdNum === 0) {
        x1 = Model1.offsetLeft;
        y1 = Model1.offsetTop + Model1.offsetHeight / 2;
        x2 = Model2.offsetLeft;
        y2 = Model2.offsetTop + Model2.offsetHeight / 2;
      } else {
        x1 = Model1.offsetLeft;
        y1 = Model1.offsetTop + Model1.offsetHeight / 2;
        x2 = Model2.offsetLeft;
        y2 = Model2.offsetTop + Model2.offsetHeight / 2;
      }

      const postline = document.getElementById(lineItem.line_Associate_id);
      if (!postline) continue;

      const p0 = { x: x1 + 150, y: y1 };
      const p1 = { x: x2 - 100, y: y1 };
      const p2 = { x: x2 - 20, y: y2 };
      const p3 = { x: x2 - 10, y: y2 };

      postline.setAttribute('d', `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`);

      const labelId = `${lineItem.line_Associate_id}_label`;
      const labelEl = document.getElementById(labelId);
      if (labelEl && lineItem.label) {
        const mid = cubicBezierPoint(0.5, p0, p1, p2, p3);
        labelEl.setAttribute('x', mid.x);
        labelEl.setAttribute('y', mid.y);
      }
    }
  }, []);

  useEffect(() => {
    const pAssocModel = associationModel;
    if (!pAssocModel?.AssociationModel?.length) return undefined;

    const gLines = document.getElementById('gLines');
    if (!gLines) return undefined;

    let idLine = 0;
    const cleanups = [];
    const dragged = new Set();

    const dragElement = (elmnt) => {
      if (!elmnt || dragged.has(elmnt.id)) return;
      dragged.add(elmnt.id);

      let pos1 = 0;
      let pos2 = 0;
      let pos3 = 0;
      let pos4 = 0;

      const dragMouseDown = (e) => {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
      };

      const elementDrag = (e) => {
        const lmSvgArea = document.getElementById('lmDiagramSvg');
        if (!lmSvgArea) return;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        const top = elmnt.offsetTop - pos2;
        const left = elmnt.offsetLeft - pos1;
        if (
          e.clientY <= lmSvgArea.clientHeight &&
          e.clientY >= 130 &&
          left + elmnt.clientWidth <= lmSvgArea.clientWidth &&
          left >= 0
        ) {
          elmnt.style.top = `${top}px`;
          elmnt.style.left = `${left}px`;
        }
        updateConnection(associationRef.current);
      };

      const closeDragElement = () => {
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
      };

      const header = document.getElementById(`${elmnt.id}header`);
      const target = header ?? elmnt;
      target.addEventListener('mousedown', dragMouseDown);
      cleanups.push(() => {
        target.removeEventListener('mousedown', dragMouseDown);
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
      });
    };

    for (const AsocModel of pAssocModel.AssociationModel) {
      const lineId = `ulmLine${idLine}`;
      const group = document.createElementNS(SVG_NS, 'g');
      group.setAttribute('class', 'lm-diagram-link');

      const amElement = document.createElementNS(SVG_NS, 'path');
      amElement.setAttribute('marker-end', 'url(#arrowhead)');
      amElement.setAttribute('class', 'lm-diagram-path');
      amElement.setAttribute('id', lineId);
      group.appendChild(amElement);

      if (AsocModel.label) {
        const textEl = document.createElementNS(SVG_NS, 'text');
        textEl.setAttribute('id', `${lineId}_label`);
        textEl.setAttribute('class', 'lm-diagram-link-label');
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('dominant-baseline', 'middle');
        textEl.textContent = AsocModel.label;
        group.appendChild(textEl);
      }

      gLines.appendChild(group);
      AsocModel.line_Associate_id = lineId;

      dragElement(document.getElementById(AsocModel.from));
      dragElement(document.getElementById(AsocModel.to));
      idLine++;
    }

    updateConnection(pAssocModel);

    return () => {
      cleanups.forEach((fn) => fn());
      while (gLines.firstChild) {
        gLines.removeChild(gLines.firstChild);
      }
    };
  }, [associationModel, updateConnection]);

  return null;
}

export default DrawAssociation;
