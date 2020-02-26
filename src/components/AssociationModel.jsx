

class AssociationModel {

    constructor() {

        this.QId = 0;
        this.AssociationModel = [];
        this.listModels = [];
 
        this.color = "";
        console.log("Assoc constructor");
    }



    setLink(pmodel,pmodel1) {

        let CountId = this.QId;
        let i = 0;
        let pairs = [];
        for (var item of arguments) {
            
            if (item.Id === 0) {
                item.Id = `lm${CountId}`;
                pairs[i] = item;
                this.listModels[this.listModels.length] = item
               
                i++;
            }
            else {
                pairs.multi = true;
            }
            
            CountId++;
           
        }
        this.QId = CountId;
        pairs.from = pmodel.Id;
        pairs.to = pmodel1.Id;

        this.AssociationModel[this.AssociationModel.length] = pairs;

    }


    setFrom(pFrom) {

        this.From = pFrom;

    }

    setTo(pto){

        this.To = pto;

    }

    getAssociation() {
        let Association = {
            From: this.from,
            To: this.to
        }


        return Association;
    }

    setId(pId) {
        this.Id = pId;
    }

}

export default AssociationModel;

