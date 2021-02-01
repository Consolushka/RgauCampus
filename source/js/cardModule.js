'use strict';

(function () {
  const FLOOR_CONTAINER = document.querySelector(`.js-floors`);
  const CATHEDRA_CONTAINER = document.querySelector(`.js-cathedra`);
  const FACS_CONTAINER = document.querySelector(`.js-facs`);


  window.cardModule = {
    popupObject: document.querySelector(`.js-popup-all`),

    show(object) {
      this.object = object;
      this.getObjectData();
      this.resetPopup();

      window.building.fillBuildingStructure(this.buildingData, this.popupObject);

      this.popupObject.classList.remove(`popup--hidden`);
      if(window.utilModule.windowWidth>=720){
        this.locatePopup();
      }
      this.listenClosePopup();
    },

    getObjectData() {
      this.buildingObject = this.object;
      this.buildingRect = this.buildingObject.getBoundingClientRect();
      window.dataModule.campuses.forEach((item) => {
        if (item.name === this.buildingObject.dataset.number) {
          this.buildingData = item;
        }
      });
    },

    resetPopup() {
      this.popupObject.querySelector(`.js-popup-extra`).classList.add("visually-hidden");
      FLOOR_CONTAINER.innerHTML = ``;
      CATHEDRA_CONTAINER.innerHTML = ``;
      FACS_CONTAINER.innerHTML = ``;
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
