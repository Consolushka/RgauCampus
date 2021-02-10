'use strict';

(function () {

  window.titleModule = {

    popup: document.querySelector(`.js-popup-general`),

    showTitle(object) {
      this.buildingObject = object;
      this.buildingRect = this.buildingObject.getBoundingClientRect();

      this.resetPopup();

      this.checkBuildingNumber();

      this.popup.classList.remove(`popup--hidden`);
      this.popup.classList.add(`building-title--${this.buildingObject.dataset.type}`);
      this.locatePopup();
    },

    resetPopup() {
      this.popup.querySelector(`.js-popup-general-empty`).classList.add("visually-hidden");
      this.popup.querySelector(`.js-popup-general-data`).classList.remove("visually-hidden");
      Object.keys(window.utilModule.BUILDING_PURPOSE_TRANSLATOR).forEach((type) => {
        this.popup.classList.remove(`building-title--${type}`);
      })
    },

    checkBuildingNumber() {
      if (this.buildingObject.dataset.number === "none") {
        this.fillEmptyData();
      } else {
        this.getObjectData();
      }
    },

    getObjectData() {
      window.dataModule.buildings.forEach((item) => {
        if (item.name === this.buildingObject.dataset.number) {
          this.buildingData = item;
        }
      });
      this.fillData();
    },

    fillEmptyData() {
      this.popup.querySelector(`.js-popup-general-empty`).classList.remove("visually-hidden");
      this.popup.querySelector(`.js-popup-general-data`).classList.add("visually-hidden");
    },

    fillData() {
      this.popup.querySelector(`.building-title-purpose`).textContent = window.utilModule.BUILDING_PURPOSE_TRANSLATOR[this.buildingObject.dataset.type];
      this.popup.querySelector(`.building-title-name`).textContent = this.buildingObject.dataset.number;
    },

    closeTitle() {
      this.popup.classList.add(`popup--hidden`);
    },

    locatePopup() {
      let posX = this.buildingRect.left + this.buildingRect.width / 3 * 2,
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 + window.pageYOffset;
      if (this.buildingRect.left + this.buildingRect.width / 3 * 2 > window.document.documentElement.clientWidth / 3 * 2) {
        posX = this.buildingRect.left - this.buildingRect.width / 3 * 2 - this.popup.clientWidth / 2;
      }
      if (this.buildingRect.top + this.buildingRect.height / 3 * 2 + this.popup.getBoundingClientRect().height > document.documentElement.clientHeight) {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 - this.popup.getBoundingClientRect().height + window.pageYOffset;
      }
      this.popup.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
    }
  }

})();
