import { useMemo } from 'react';
import DrawComponent from './DrawComponent.jsx';
import { DiagramModel } from '../DiagramModel.js';
import AssociationModel from '../AssociationModel.js';
import ControllerLM from '../ControllerLM.js';

/**
 * Diagram container. Builds the default demo graph once (same idea as the old componentWillMount).
 * Pass `buildDiagram` to override with your own ControllerLM + models.
 */
export default function LMDiagram({ datosMapa: _datosMapa, buildDiagram, className }) {
  const diagram = useMemo(() => {
    if (buildDiagram) {
      return buildDiagram();
    }
    const model1 = new DiagramModel('Model', 'Body1');
    model1.setPosition(219, 150);

    const model2 = new DiagramModel('Model 1', 'Body2');
    model2.setPosition(200, 450);

    const model3 = new DiagramModel('Model 2', 'Body3');
    model3.setPosition(200, 800);

    const association = new AssociationModel();
    association.setLink(model1, model2, 'Asociación');
    association.setLink(model2, model3, 'Continúa');

    const controllerLM = new ControllerLM();
    controllerLM.setAssociations(association);
    return controllerLM;
  }, [buildDiagram]);

  return (
    <div className={`lm-diagram-root ${className ?? ''}`.trim()} id="ModalDiagrama" role="presentation">
      <DrawComponent association={diagram} />
    </div>
  );
}
