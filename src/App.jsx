import './App.css';
import { LMDiagram } from './index.js';

function App() {
  return (
    <div className="lm-demo">
      <div className="lm-demo__card">
        <h1 className="lm-demo__title">LM Diagram</h1>
        <p className="lm-demo__subtitle">Arrastra los nodos; las asociaciones se actualizan en vivo.</p>
        <LMDiagram />
      </div>
    </div>
  );
}

export default App;
