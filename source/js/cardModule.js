'use strict';

(function () {
  const FLOOR_CONTAINER = document.querySelector(`.js-floors`);
  const CATHEDRA_CONTAINER = document.querySelector(`.js-cathedra`);
  const FACS_CONTAINER = document.querySelector(`.js-facs`);


  window.cardModule = {
    popupObject: document.querySelector(`.js-popup`),
    buildingObject: null,
    buildingRect: null,
    buildingData: null,

    show(object) {
      this.buildingObject = object;
      this.buildingRect = this.buildingObject.getBoundingClientRect();
      window.dataModule.campuses.forEach((item)=>{
        if(item.name===this.buildingObject.dataset.number){
          this.buildingData = item;
        }
      })
      this.resetPopup();

      window.building.fillBuildingStructure(this.buildingData,this.popupObject);

      this.popupObject.classList.remove(`popup--hidden`);
      this.locatePopup();
      this.listenClosePopup();
    },

    resetPopup() {
      console.log(this.buildingData);
      this.popupObject.querySelector(`.js-popup-extra`).classList.add("visually-hidden");
      FLOOR_CONTAINER.innerHTML = ``;
      CATHEDRA_CONTAINER.innerHTML = ``;
      FACS_CONTAINER.innerHTML = ``;
    },

    locatePopup() {
      let posX = this.buildingRect.left + this.buildingRect.width, posY = this.buildingRect.top + this.buildingRect.height / 3 * 2;
      if (this.buildingRect.left + this.buildingRect.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = this.buildingRect.left + this.buildingRect.width - window.document.documentElement.clientWidth / 3;
      }
      if (this.buildingRect.top + this.buildingRect.height /3 * 2 + this.popupObject.getBoundingClientRect().height > document.documentElement.clientHeight) {
        posY =this.buildingRect.top + this.buildingRect.height /3 * 2 + this.popupObject.getBoundingClientRect().height - document.documentElement.clientHeight;
      }
      this.popupObject.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
    },

    listenClosePopup(){
      this.popupObject.querySelector(`.js-popup-close`).addEventListener(`click`, ()=> {
        this.popupObject.classList.add(`popup--hidden`);
      })
    }
  };
})();
