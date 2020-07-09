import React from 'react';
//import AutoBind from 'react-autobind';
import DrawAssosiation from './DrawAssociation.jsx';



class DrawComponent extends React.Component {
    constructor(props) {


        super(props);
        this.state = {
            models: []

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ models: nextProps.association.BuildDiagram.listModels });
    }
     



    render() {
        const pListModel = this.props.association.BuildDiagram.listModels;
        class Model extends React.Component {
        
            render() {
                return (
                    <svg className="canvas" id="lmDiagramSvg" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} aria-labelledby={this.props.iconTitle} >
                            <defs>
                                <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5"
                                    markerWidth="6" markerHeight="6" orient="auto">
                                <path d="M 0 0 L 10 5 L 0 10 z" />
                                </marker>
                            </defs>
                            <g fill="none" stroke="black" id="gLines" strokeWidth="2" markerEnd="url(#arrowhead)">
                               
                            </g>
                    </svg >
                )
            }
        };
    

        return (


            <div>

                <div>
                    <div>

                        {

                            pListModel.map((model, i) => {

                                return (
                                    <div className="flowchart-operator zlmModel flowchart-default-operator ui-draggable card-4" style={{ top: model.top, bottom: model.bottom, left: model.left, right: model.right, width: model.width, height: 102 }} key={i} id={model.Id}>{/*className='zlmModel'*/}

                                        <div className="flowchart-operator-title ui-draggable-handle">{model.header} </div>
                                        <div className="flowchart-operator-inputs-outputs">
                                            <div className="flowchart-operator-inputs"></div>
                                            <div className="flowchart-operator-outputs">
                                                <div className="flowchart-operator-connector">
                                                    <div className="flowchart-operator-connector-label">{model.body}</div>
                                                    <div className="flowchart-operator-connector-arrow"></div>
                                                    <div className="flowchart-operator-connector-small-arrow" style={{ borderLeftColor: ' rgb(51, 102, 255)' }}></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                );

                            })
                        }

                    </div>

                </div>
                {/*<div dangerouslySetInnerHTML={{ __html: useTag }} />*/}
                <div >
                    <Model iconTitle="animatedOffice" width='100%' height='350' />
                </div>
                <DrawAssosiation AssociationModel={this.props.association.BuildDiagram} />

            </div>
        );

        
    }
}

export default DrawComponent;

