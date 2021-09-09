'use strict';

import {BuildingElement} from "./classes";

(function () {

  window.cardModule = {
    popupObject: document.querySelector(`.js-popup-all`),

    show(object) {
      this.building = new BuildingElement(object);
      console.log(building);

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
