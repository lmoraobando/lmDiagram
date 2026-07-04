import DrawAssociation from './DrawAssociation.jsx';
import SvgDiagramLayer from './SvgDiagramLayer.jsx';

export default function DrawComponent({ association }) {
  const listModels = association?.BuildDiagram?.listModels ?? [];

  return (
    <div className="lm-diagram-canvas">
      <div className="lm-diagram-nodes" aria-label="Diagram models">
        {listModels.map((model, i) => (
          <div
            className="lm-diagram-node"
            style={{
              top: model.top,
              left: model.left,
              width: model.width,
              minHeight: model.height ?? 102,
            }}
            key={model.Id ?? i}
            id={model.Id}
          >
            <div className="lm-diagram-node__header">{model.header}</div>
            <div className="lm-diagram-node__body">
              <span className="lm-diagram-node__label">{model.body}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="lm-diagram-svg-wrap">
        <SvgDiagramLayer width="100%" height={350} />
      </div>

      <DrawAssociation associationModel={association?.BuildDiagram} />
    </div>
  );
}
