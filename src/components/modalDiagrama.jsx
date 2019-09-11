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


     
        //const model1 = new Model("Orden Compra: " + data.Orden_Id, "Estado: " + data.Estado);
        //model1.setPosition(24, 33);

        const model1 = new Model("Model", "Body1");
        model1.setPosition(219, 250);

        const model2 = new Model("Consolidacion", "Body2");
        model2.setPosition(219, 179);
 
        const model3 = new Model("Consolidacion", "Body3"); 
        model3.setPosition(365, 46);


        const association = new Association();
        association.setLink(model1, model2);
        association.setLink(model2, model3);

        const controllerLM = new ControllerLM();
        controllerLM.setAssociations(association);

        this.state.Diagram = controllerLM;
        //this.setState({Diagram:controllerLM});

    }

    CargaMapa(data) {
        let ConsolidadoList = data.ConsolidadoEncabezado;
        let NacionalizacionList = data.NacionalizacionEncabezado ? data.NacionalizacionEncabezado : {}; 
        
        let model1 = [];

        let ordenDetalle = ``
        switch (this.props.datosMapa.Estado) {

            case "AD":
                ordenDetalle = `Estado: Aplicada
                                `
                break;

            case "GU":
                ordenDetalle = `Estado: Guardado
                                 `
                break;
            case "AP":
                ordenDetalle = `Estado: Aplicado
                                ` 
                break;
            case "NU":
                ordenDetalle = `Estado: Nula
                                `
                break;
            case "TR":
                ordenDetalle = `Estado: Transporte
                                `
                break;
            
        }

       const fechaOrden = this.props.datosMapa.Fecha_Crea_Formateada;

       ordenDetalle +="Fecha:" +fechaOrden;
        //ORDEN
       const Orden = new Model("Orden Compra " + ConsolidadoList[0].Orden_Id, ordenDetalle);
        Orden.setPosition(21, 120);

        const association = new Association();
        
        for (var i = 0; i < ConsolidadoList.length; i++) {
            let x = 230;
            let y = 430;
            let BodyModel;

            switch (ConsolidadoList[i].Consolidado_Estado) {

                case "AF":
                    BodyModel = `Estado: Almacen fiscal
                                 `;
                    break;

                case "GU":
                    BodyModel = `Estado: Guardado
                                 `;
                    break;
                case "NU":
                    BodyModel = `Estado: Nula`;
                    break;
                case "AP":
                    BodyModel = `Estado: Aplicado 
                                \n`;
                    break;
                
            } 

            model1[i] = new Model("Consolidado " + ConsolidadoList[i].Consolidado_Id, BodyModel);
            model1[i].setPosition(x, y);

            association.setLink(Orden, model1[i]);
            x += 50;
            y += 335;

        }

        let x = 21;
        let y = 700;
        for (var i = 0; i < NacionalizacionList.length; i++) {
           
            let BodyModel;
            let ObjetoCo = {};
            let ObjNac = {};
     
            switch (NacionalizacionList[i].Calculo_Estado) {

                case "RE":
                    BodyModel = `Estado: Recibido`;
                    break;
                case "GU":
                    BodyModel = `Estado: Guardado`;
                    break;
                case "NU":
                    BodyModel = `Estado: Nula`;
                    break;
                case "AP":
                    BodyModel = `Estado: Aplicado`;
                    break;

            } 



            //Nac
            ObjNac = new Model("Nacionalización " + NacionalizacionList[i].Calculo_Id, BodyModel);
            ObjNac.setPosition(x,y);
            model1[model1.length] = ObjNac;
            
            ObjetoCo = model1.filter(co => co.header == "Consolidado " + NacionalizacionList[i].Consolidado_Id)[0];


            association.setLink(ObjetoCo, ObjNac);
            x += 120;
            y += 0;
        }


        const controllerLM = new ControllerLM();
        controllerLM.setAssociations(association);
        this.setState({ Diagram: controllerLM });



    }
    

    sinFormato(value, row, index, field) {
        return value
    }
    render() {

        //this.state.engine.canvas.style.height = '350px' ,<Model  /> ;
        return (
            <div className="modal" id="ModalDiagrama" role="dialog" ref="modal">
               <DrawComponent association={this.state.Diagram} />
            </div>
        );
    }
};


export default ModalDiagrama;