import React from 'react';
import Model from './Model'
import Association from './AssociationModel.jsx';
import DrawComponent from './DrawComponent';
import ControllerLM from './ControllerLM';

class ModalDiagrama extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            Diagram: {},
            DatosDiagrama: '',
            DatosRow: ''
        }

        this.state.DatosRow = props.datosMapa;
    }

   

    componentWillMount() {

        const model1 = new Model("Model", "Body1");
        model1.setPosition(219, 150);

        const model2 = new Model("Model 1", "Body2");
        model2.setPosition(200, 450);
 
        const model3 = new Model("Model 2", "Body3"); 
        model3.setPosition(200, 800);


        const association = new Association();
        association.setLink(model1, model2);
        association.setLink(model2, model3);

        const controllerLM = new ControllerLM();
        controllerLM.setAssociations(association);

        
        this.setState({Diagram:controllerLM});

    }

    render() {
        
        return (
            <div className="modal" id="ModalDiagrama" role="dialog" ref="modal">
               <DrawComponent association={this.state.Diagram} />
            </div>
        );
    }
};


export default ModalDiagrama;