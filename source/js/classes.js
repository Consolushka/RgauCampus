export class BuildingData {
  constructor(data) {
    this.name = data.name
    this.address = data.address
    this.extra = data.extra
  }
}

export class LearningBuildingData extends BuildingData{
  constructor(data) {
    super(data);
    this.flrs = data.flrs;
    this.facs = data.facs;
    this.owners = data.owners;
  }
}

export class BuildingElement{
    constructor(el) {
      this.element = el;
      this.buildingName = el.dataset.number;
      this.type = el.dataset.type;
      this.rect = this.element.getBoundingClientRect();
    }
  }
