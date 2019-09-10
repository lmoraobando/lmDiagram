 class Model {

    constructor(pHead, pBody) {
        
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

}

export default Model;

