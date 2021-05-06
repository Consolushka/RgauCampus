'use strict';

(function () {
  class Building{
    constructor(el) {
      this.element = el;
      this.buildingName = el.dataset.number;
      this.type = el.dataset.type;
      this.rect = this.element.getBoundingClientRect();
    }
  }

  class LearningBuilding extends Building{
    constructor(el) {
      super(el);
      this.data = window.dataModule.buildings.find((building)=>{
        if(building.name.toLowerCase() === this.buildingName.toLowerCase()){
          return building;
        }
      })
    }
  }

  class OtherTypeBuilding extends Building{
    constructor(el) {
      super(el);
      this.data = window.dataModule.other[0][this.type].find((building) => {
        if (building.name.toLowerCase() === this.buildingName.toLowerCase()) {
          return building;
        }
      });
    }
  }

  window.cardModule = {
    popupObject: document.querySelector(`.js-popup-all`),

    show(object) {
      switch (object.dataset.type) {
        case "learning":
          this.building = new LearningBuilding(object);
          break;
        default:
          this.building = new OtherTypeBuilding(object);
          break;
      }

      window.building.fillBuildingStructure(this.building.data, this.popupObject);

      this.popupObject.classList.remove(`popup--hidden`);
      if (window.utilModule.windowWidth >= 720) {
        this.locatePopup();
      }
      this.listenClosePopup();
    },

    locatePopup() {
      let posX = this.building.rect.left + this.building.rect.width,
        posY = this.building.rect.top + this.building.rect.height / 3 * 2 + window.pageYOffset;
      // if (this.buildingRect.left + this.buildingRect.width > window.document.documentElement.clientWidth / 3 * 2) {
      //   posX = this.buildingRect.left - this.buildingRect.width - this.popupObject.clientWidth;
      // }
      // if (this.buildingRect.top + this.buildingRect.height / 3 * 2 + this.popupObject.getBoundingClientRect().height > document.documentElement.clientHeight) {
      //   posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 - this.popupObject.getBoundingClientRect().height + window.pageYOffset;
      // }
      this.popupObject.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
    },

    listenClosePopup() {
      this.popupObject.querySelector(`.js-popup-close`).addEventListener(`click`, this.closePopup);
      window.addEventListener(`keydown`,this.checkClosing);
    },

    checkClosing(evt) {
      if (evt){
        if(evt.key==="Escape"){
          window.cardModule.closePopup();
        }
      }
    },

    closePopup() {
      window.cardModule.popupObject.classList.add(`popup--hidden`);
      window.cardModule.popupObject.querySelector(`.js-popup-close`).removeEventListener(`click`, window.cardModule.closePopup);
      window.removeEventListener(`keydown`,window.cardModule.checkClosing);
    }
  };
})();
