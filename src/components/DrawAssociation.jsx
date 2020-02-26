import React from 'react';
//import AutoBind from 'react-autobind';
//import ReactDOM from 'react-dom';

class DrawAssociation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Association: [],
            componentModel: [],
            lHeighArea: 0

        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({Association:nextProps.AssociationModel});
        this.createAssociate(this.state.Association);
    }

    componentDidMount() {
        this.setState({Association:this.props.AssociationModel},this.createAssociate(this.props.AssociationModel));
    }


    createAssociate(pAssocModel) {



        let x = [];
        let y = [];
        let i = 0;
        let idLine = 0;
        
        for (var AsocModel of pAssocModel.AssociationModel) {
            i = 0;
            x = [];//coordenada eje X
            y = [];//Coordenada eje Y
            let line = this.createLine("ulmLine" + idLine);
            AsocModel.line_Associate_id = line.getAttribute("id");


            for (var Model of AsocModel) {

                if (AsocModel.length == 1) {
                    AsocModel[1] = pAssocModel.listModels.filter(model => model.Id == AsocModel.from)[0];
                };


                this.dragElement(document.getElementById(AsocModel.from));
                this.dragElement(document.getElementById(AsocModel.to));
                let modelElement = document.getElementById(Model.Id);
               

                if (i == 0) {
                    if (parseInt(AsocModel.line_Associate_id.substring(7, AsocModel.line_Associate_id.length)) == 0) {
                        x[x.length] = modelElement.offsetLeft + 155 ? modelElement.offsetLeft + 155 : Model.left + 155;// + (Model.left + 27);//225
                        y[y.length] = modelElement.offsetTop ? modelElement.offsetTop : Model.top;   //+ (Model.top + 50);//150

                    }
                    else {
                        x[x.length] = modelElement.offsetLeft ? modelElement.offsetLeft : Model.left;// + (Model.left + 27);//225
                        y[y.length] = modelElement.offsetTop ? modelElement.offsetTop : Model.top;   //+ (Model.top + 50);//150

                    }
                }
                else {
                    if (parseInt(AsocModel.line_Associate_id.substring(7, AsocModel.line_Associate_id.length)) == 0) {
                        x[x.length] = modelElement.offsetLeft ? modelElement.offsetLeft  : Model.left; //+ (div2.offsetWidth); 
                        y[y.length] = modelElement.offsetTop ? modelElement.offsetTop + 65 : Model.top+65;    //+ (div2.offsetHeight); 265

                    } 
                    else {
                        x[x.length] = modelElement.offsetLeft > 0 ? modelElement.offsetLeft + 156 : Model.left + 156; //+ (div2.offsetWidth); 
                        y[y.length] = modelElement.offsetTop > 0? modelElement.offsetTop+65 : Model.top +65;    //+ (div2.offsetHeight); 265

                    }

                }



                line.setAttribute('x' + (i + 1), x[i]);
                line.setAttribute('y' + (i + 1), y[i]);

                i++;
            }
            idLine++;
        }

        this.setState({Association:pAssocModel});

    }


    createLine(lineId) {

        let lmSvgArea = document.getElementById("lmDiagramSvg");//;
        let svgNS = "http://www.w3.org/2000/svg";
        let amElement = document.createElementNS(svgNS, "line");
        amElement.setAttribute("marker-end", "url(#arrow)");
        amElement.setAttribute("class", "line");
        amElement.setAttribute("id", lineId);
        lmSvgArea.appendChild(amElement);

        return amElement;
       
    }

    dragElement(elmnt) {
        let $this = this;
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (elmnt) {
            if (document.getElementById(elmnt.id + "header")) {

                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {

                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();

                pos3 = e.clientX;
                pos4 = e.clientY;

                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }



            function elementDrag(e) {

                let lmSvgArea = document.getElementById("lmDiagramSvg");//;
                e = e || window.event;
                e.preventDefault();
                // calcular la nueva position :
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                let top = (elmnt.offsetTop - pos2);
                let left = (elmnt.offsetLeft - pos1);
                if (((e.clientY <= lmSvgArea.clientHeight) && (e.clientY >= 130)) && (((left + elmnt.clientWidth) <= lmSvgArea.clientWidth) && (left >= 0))) {

                    // establece la nueva posicion:
                    elmnt.style.top = top + "px";
                    elmnt.style.left = left + "px";

                    console.log("x: " + e.clientX + "offsetLeft: " + elmnt.offsetLeft)
                }
                $this.updateConection($this.state.Association, elmnt.id);

            }

            function closeDragElement() {
                // se detiene cuando se suelta el click:
                document.onmouseup = null;
                document.onmousemove = null;

            }
        }


    }



    updateConection(pAssocModel, ModelId) { 
        let postline;
        for (var lineItem of pAssocModel.AssociationModel) {
            let Model1 = document.getElementById(lineItem.from);
            let Model2 = document.getElementById(lineItem.to);

            //var rect = Model1.getBoundingClientRect();
            //console.log(rect.top, rect.right, rect.bottom, rect.left);
            if (parseInt(lineItem.line_Associate_id.substring(7, lineItem.line_Associate_id.length)) == 0) {
                var x1 = Model1.offsetLeft+155//+ (Model1.offsetWidth);
                var y1 = Model1.offsetTop //+ (Model1.offsetHeight);
                var x2 = Model2.offsetLeft//+ (div2.offsetWidth);
                var y2 = Model2.offsetTop +65//+ (div2.offsetHeight);
            }
            else {
                var x1 = Model1.offsetLeft+156//+ (Model1.offsetWidth);
                var y1 = Model1.offsetTop +65//+ (Model1.offsetHeight);
                var x2 = Model2.offsetLeft//+ (div2.offsetWidth);
                var y2 = Model2.offsetTop//+ (div2.offsetHeight);
            }
           

            postline = document.getElementById(lineItem.line_Associate_id);
            postline.setAttribute('x1', x1);
            postline.setAttribute('y1', y1);
            postline.setAttribute('x2', x2);
            postline.setAttribute('y2', y2);

        }






    }








    render() {

        const pListModel = this.state.Association.listModels;





        return (
            <div>


                

            </div>
        );
    }
};
export default DrawAssociation;