'use strict';

(function () {
  const FLOOR_TEMPLATE = document.querySelector(`#floorTempl`).content.querySelector(`.floor`);
  const CATHEDRA_TEMPLATE = document.querySelector(`#cathedraTempl`).content.querySelector(`.cathedra`);
  const FACS_TEMPLATE = document.querySelector(`#facTempl`).content.querySelector(`.fac`);
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
      this.resetPopup();

      this.fillBuildingStructure();

      this.popupObject.classList.remove(`popup--hidden`);
      this.locatePopup();

      this.listenClosePopup();
    },

    resetPopup() {
      this.buildingRect = this.buildingObject.getBoundingClientRect();
      this.buildingData = window.dataModule.campuses[this.buildingObject.dataset.number];
      console.log(this.buildingData);
      FLOOR_CONTAINER.innerHTML = ``;
      CATHEDRA_CONTAINER.innerHTML = ``;
      FACS_CONTAINER.innerHTML = ``;
    },

    locatePopup() {
      let posX, posY;
      if (this.buildingRect.left + this.buildingRect.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = this.buildingRect.left + this.buildingRect.width - window.document.documentElement.clientWidth / 3;
      } else {
        posX = this.buildingRect.left + this.buildingRect.width;
      }
      if (this.buildingRect.top + this.buildingRect.height / 3 * 2 + this.popupObject.clientHeight > document.documentElement.clientHeight) {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 - this.popupObject.clientHeight;
      } else {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2;
      }

      this.popupObject.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);

    },

    fillBuildingStructure() {
      this.popupObject.querySelector(`.info__name-number`).textContent = `${this.buildingData.name}`;
      let purpose = String(this.buildingData.purpose)[0].toUpperCase()+String(this.buildingData.purpose).slice(1);
      this.popupObject.querySelector(`.js-popup-purpose`).textContent = purpose;
      this.fillFloorTemplate();
      this.fillCathedraTemplate();
      this.fillFacsTemplate();
    },


    fillFloorTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title floors__title title title--h3";
      heading.textContent = "Этажи";
      FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.flrs).forEach( (floor, i)=> {
        let floorFragment = FLOOR_TEMPLATE.cloneNode(true);
        floorFragment.querySelector(`.floor-title`).textContent = `${window.utilModule.getSimpleTranslate(i)} Этаж`;
        this.buildingData.flrs[floor].forEach((room)=> {
          let roomFragment = document.createElement(`li`);
          roomFragment.className = `structure__rooms-list-item`;
          roomFragment.textContent = Object.keys(room)[0];
          roomFragment.setAttribute(`title`,`${room[Object.keys(room)[0]]}`);
          floorFragment.querySelector(`.structure__rooms-list`).appendChild(roomFragment);
        })
        FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, floorFragment.outerHTML);
      })
    },


    fillCathedraTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title cathedras__title title title--h3";
      heading.textContent = "Кафедры";
      CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.cath).forEach((cathedra) => {
        let cathedraFragment = CATHEDRA_TEMPLATE.cloneNode(true);
        cathedraFragment.querySelector(`.cathedra-title`).textContent = cathedra;
        this.buildingData.cath[cathedra].forEach((room) => {
          let roomFragment = document.createElement(`li`);
          roomFragment.className = `structure__rooms-list-item`;
          roomFragment.textContent = `${room}`;
          cathedraFragment.querySelector(`.structure__rooms-list`).appendChild(roomFragment);
        })
        CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, cathedraFragment.outerHTML);
      })
    },


    fillFacsTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title fac__title title title--h3";
      heading.textContent = "Факультеты и Институты";
      FACS_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.facs).forEach((fac) => {
        let facFragment = FACS_TEMPLATE.cloneNode(true);
        facFragment.querySelector(`.fac-title`).textContent = fac;
        this.buildingData.facs[fac].forEach((room) => {
          let roomFragment = document.createElement(`li`);
          roomFragment.className = `structure__rooms-list-item`;
          roomFragment.textContent = `${room}`;
          facFragment.querySelector(`.structure__rooms-list`).appendChild(roomFragment);
        })
        FACS_CONTAINER.insertAdjacentHTML(`beforeend`, facFragment.outerHTML);
      })
    },

    listenClosePopup(){
      this.popupObject.querySelector(`.js-popup-close`).addEventListener(`click`, ()=> {
        this.popupObject.classList.add(`popup--hidden`);
      })
    }
  };
})();
