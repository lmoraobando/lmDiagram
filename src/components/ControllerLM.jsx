
class ControllerLM {

    

    constructor() {
        this.BuildDiagram = {}
        console.log("Assoc constructor");
    }



    setAssociations(pParam) {
        
        this.BuildDiagram = pParam;
    }

    getAssociation() {

        return this.BuildDiagram;
    }

}

export default ControllerLM;