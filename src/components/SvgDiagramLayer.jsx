import { useId } from 'react';

export default function SvgDiagramLayer({ width = '100%', height = 350 }) {
  const titleId = useId().replace(/:/g, '');
  return (
    <svg
      className="lm-diagram-svg"
      id="lmDiagramSvg"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      aria-labelledby={titleId}
    >
      <title id={titleId}>Diagram connections</title>
      <defs>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--lm-arrow, #6366f1)" />
        </marker>
      </defs>
      <g fill="none" stroke="var(--lm-line, #6366f1)" id="gLines" strokeWidth="2" markerEnd="url(#arrowhead)" />
    </svg>
  );
}
