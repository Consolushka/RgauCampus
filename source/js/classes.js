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

export class BuildingElement {
  constructor(el) {
    this.element = el;
    this.type = el.dataset.type;
    this.rect = this.element.getBoundingClientRect();
    this.FillFullInfo(el.dataset.number);
  }

  FillFullInfo(name) {
    window.dataModule.buildings[this.type].forEach((data) => {
      if (data.name === name) {
        console.log(data);
        this.name = data.name;
        this.address = data.address;
        this.extra = data.extra;
        if (this.type === "learning") {
          this.flrs = data.flrs;
          this.facs = data.facs;
          this.owners = data.owners;
        }
      }
    });
  }
}
