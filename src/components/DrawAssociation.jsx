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
            this.dragElement(document.getElementById(AsocModel.from));
            this.dragElement(document.getElementById(AsocModel.to));

            idLine++;



        }

       
        this.updateConection(pAssocModel)
        this.setState({Association:pAssocModel});

    }


    createLine(lineId) {

  

        let lmSvgArea = document.getElementById("lmDiagramSvg");//;
        const gLines = document.getElementById("gLines");
        let svgNS = "http://www.w3.org/2000/svg";
        let amElement = document.createElementNS(svgNS, "path");
        amElement.setAttribute("marker-end", "url(#arrowhead)");
        amElement.setAttribute("class", "path");
        amElement.setAttribute("id", lineId);
        gLines.appendChild(amElement);
        lmSvgArea.appendChild(gLines);

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



    updateConection(pAssocModel) { 
        let postline;
        let x1 = 0
        let y1 = 0
        let x2 = 0
        let y2 = 0

        for (var lineItem of pAssocModel.AssociationModel) {
            let Model1 = document.getElementById(lineItem.from);
            let Model2 = document.getElementById(lineItem.to);

            if (parseInt(lineItem.line_Associate_id.substring(7, lineItem.line_Associate_id.length)) === 0) {
                 x1 = Model1.offsetLeft//+ (Model1.offsetWidth);
                 y1 = Model1.offsetTop + (Model1.offsetHeight)/2;
                 x2 = Model2.offsetLeft//+ (div2.offsetWidth);
                 y2 = Model2.offsetTop + (Model2.offsetHeight)/2;
            }
            else {
                 x1 = Model1.offsetLeft//+ (Model1.offsetWidth);
                 y1 = Model1.offsetTop + (Model1.offsetHeight)/2;
                 x2 = Model2.offsetLeft//+ (div2.offsetWidth);
                 y2 = Model2.offsetTop+ (Model2.offsetHeight)/2;
            }
           

            postline = document.getElementById(lineItem.line_Associate_id);
            postline.setAttribute("d",('M' + (x1+150)+","+(y1) + " "+"C"+(x2 - 100)+ "," + (y1) + " " +(x2-20)+ "," + (y2) + " " +(x2-10) + "," + (y2)));
           

        }






    }



    render() {

        return (
            <div>
            </div>
        );
    }
};
export default DrawAssociation;