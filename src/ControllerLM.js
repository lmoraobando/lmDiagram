class ControllerLM {
  constructor() {
    this.BuildDiagram = {};
  }

  setAssociations(pParam) {
    this.BuildDiagram = pParam;
  }

  getAssociation() {
    return this.BuildDiagram;
  }
}

export default ControllerLM;
