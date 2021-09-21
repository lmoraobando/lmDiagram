import React from 'react';
 
class Model extends React.Component {
    
    constructor(props,pHead, pBody) {
        super(props);    
        this.Id = 0;
        this.top = 0;
        this.bottom = 0;
        this.left = 100;
        this.right = 0;
        this.width = 172;
        this.height = 100;
        this.header = pHead;
        this.body = pBody;    
        console.log("Model constructor");
    }

    setPosition(ptop, pleft) {
        this.top = ptop;
        this.left = pleft;
        
    }
 
 
    getPosition() {
        let Position = {
            left: this.left,
            top:this.top
        }
 
 
        return Position;
    }
 
    setId(pId) {
        this.Id = pId;
    }


    render() {
        return (
            <svg className="canvas" id="lmDiagramSvg" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} aria-labelledby={this.props.iconTitle} >
                    <defs>
                        <marker id="arrowhead" viewBox="0 0 10 10" refX="3" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" />
                        </marker>

                        <marker id="arrowheadleft" viewBox="0 0 10 10" refX="3" refY="5"
                            markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L -10 5 L 0 10 z" />
                        </marker>
                    </defs>
                    <g fill="none" stroke="black" id="gLines" strokeWidth="2" markerEnd="url(#arrowhead)">
                       
                    </g>
            </svg >
        )
    }
};


export default Model;

