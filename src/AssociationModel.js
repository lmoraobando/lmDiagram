class AssociationModel {
  constructor() {
    this.QId = 0;
    this.AssociationModel = [];
    this.listModels = [];
    this.color = '';
  }

  /**
   * @param {object} pmodel
   * @param {object} pmodel1
   * @param {string} [label] — texto opcional mostrado sobre el trazo de la asociación
   */
  setLink(pmodel, pmodel1, label) {
    let CountId = this.QId;
    let i = 0;
    const pairs = [];
    for (const item of [pmodel, pmodel1]) {
      if (item.Id === 0) {
        item.Id = `lm${CountId}`;
        pairs[i] = item;
        this.listModels[this.listModels.length] = item;
        i++;
      } else {
        pairs.multi = true;
      }
      CountId++;
    }
    this.QId = CountId;
    pairs.from = pmodel.Id;
    pairs.to = pmodel1.Id;
    if (label != null && String(label).trim() !== '') {
      pairs.label = String(label).trim();
    }
    this.AssociationModel[this.AssociationModel.length] = pairs;
  }

  setFrom(pFrom) {
    this.From = pFrom;
  }

  setTo(pto) {
    this.To = pto;
  }

  getAssociation() {
    return {
      From: this.from,
      To: this.to,
    };
  }

  setId(pId) {
    this.Id = pId;
  }
}

export default AssociationModel;
