'use strict';

(function () {
  window.cardModule = {
    popupObject: document.querySelector(`.js-popup-all`),

    show(object) {
      this.object = object;
      this.getObjectData();

      switch (this.object.dataset.type) {
        case "learning":
          this.getLearningBuildingData();
          break;
        default:
          this.getOtherBuildingData();
          break;
      }

      window.building.fillBuildingStructure(this.buildingData, this.popupObject);

      this.popupObject.classList.remove(`popup--hidden`);
      if (window.utilModule.windowWidth >= 720) {
        this.locatePopup();
      }
      this.listenClosePopup();
    },

    getObjectData() {
      this.buildingObject = this.object;
      this.buildingRect = this.buildingObject.getBoundingClientRect();
    },

    getLearningBuildingData() {
      window.dataModule.buildings.forEach((item) => {
        if (item.name.toLowerCase() === this.buildingObject.dataset.number.toLowerCase()) {
          this.buildingData = item;
        }
      });
    },

    getOtherBuildingData() {
      window.dataModule.other[0][this.buildingObject.dataset.type].forEach((item) => {
        if (item.name.toLowerCase() === this.buildingObject.dataset.number.toLowerCase()) {
          this.buildingData = item;
        }
      });
    },

    locatePopup() {
      let posX = this.buildingRect.left + this.buildingRect.width,
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 + window.pageYOffset;
      if (this.buildingRect.left + this.buildingRect.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = this.buildingRect.left - this.buildingRect.width - this.popupObject.clientWidth;
      }
      if (this.buildingRect.top + this.buildingRect.height / 3 * 2 + this.popupObject.getBoundingClientRect().height > document.documentElement.clientHeight) {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 - this.popupObject.getBoundingClientRect().height + window.pageYOffset;
      }
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
