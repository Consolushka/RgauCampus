'use strict';

(function () {

  window.titleModule = {

    popup: document.querySelector(`.js-popup-general`),

    showTitle(object){
      this.buildingObject = object;
      this.buildingRect = this.buildingObject.getBoundingClientRect();

      this.resetPopup();

      this.checkBuildingNumber();

      this.popup.classList.remove(`popup--hidden`);
      this.locatePopup();
    },

    resetPopup(){
      this.popup.querySelector(`.js-popup-general-empty`).classList.add("visually-hidden");
      this.popup.querySelector(`.js-popup-general-data`).classList.remove("visually-hidden");
    },

    checkBuildingNumber(){
      if (this.buildingObject.dataset.number === "none"){
        this.fillEmptyData();
      }
      else{
        this.getObjectData();
      }
    },

    getObjectData(){
      window.dataModule.campuses.forEach((item)=>{
        if(item.name===this.buildingObject.dataset.number){
          this.buildingData = item;
        }
      });
      this.fillData();
    },

    fillEmptyData(){
      this.popup.querySelector(`.js-popup-general-empty`).classList.remove("visually-hidden");
      this.popup.querySelector(`.js-popup-general-data`).classList.add("visually-hidden");
    },

    fillData(){
      this.popup.querySelector(`.building-title-purpose`).textContent = String(this.buildingData.purpose)[0].toUpperCase() + String(this.buildingData.purpose).slice(1);
      this.popup.querySelector(`.building-title-name`).textContent = this.buildingData.name;
    },

    closeTitle(){
      this.popup.classList.add(`popup--hidden`);
    },

    locatePopup(){
      let posX = this.buildingRect.left + this.buildingRect.width,
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 + window.pageYOffset;
      if (this.buildingRect.left + this.buildingRect.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = this.buildingRect.left - this.buildingRect.width-this.popup.clientWidth;
      }
      if (this.buildingRect.top + this.buildingRect.height / 3 * 2 + this.popup.getBoundingClientRect().height > document.documentElement.clientHeight) {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 - this.popup.getBoundingClientRect().height + window.pageYOffset;
      }
      this.popup.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
    }
  }

})();
