'use strict';

//: TODO need to select better name of variables (CAMPUS IS NOT CAMPUS, IS BUILDING)
//: TODO Maybe create classes for entities (cath, facs)

(function () {
  const FLOOR_TEMPLATE = document.querySelector(`#floorTempl`).content.querySelector(`.floor`);
  const ROOM_TEMPLATE = document.querySelector(`#roomTempl`).content.querySelector(`.floor__room`);
  const FLOOR_CONTAINER = document.querySelector(`.js-floors`);
  const CATHEDRA_TEMPLATE = document.querySelector(`#cathedraTempl`).content.querySelector(`.cathedra`);
  const DEANERY_TEMPLATE = document.querySelector(`#deaneryTempl`).content.querySelector(`.deanery`);
  const CATHEDRA_CONTAINER = document.querySelector(`.js-cathedra`);
  const DEANERY_CONTAINER = document.querySelector(`.js-deanery`);


  window.cardModule = {
    popup: document.querySelector(`.js-popup`),
    buildingObject: null,
    buildingRect: null,
    buildingData: null,

    show(object) {
      this.buildingObject = object;

      this.resetPopup();

      this.fillBuildingStructure();

      this.popup.classList.remove(`popup--hidden`);

      this.locatePopup();
    },

    resetPopup() {
      this.buildingRect = this.buildingObject.getBoundingClientRect();
      this.buildingData = window.dataModule.campuses[this.buildingObject.dataset.number];
      console.log(this.buildingData);
      this.popup.querySelector(`.info__floors`).innerHTML = ``;
      this.popup.querySelector(`.info__cathedras`).innerHTML = ``;
      this.popup.querySelector(`.info__deaneries`).innerHTML = ``;
    },

    locatePopup() {
      let posX, posY;
      if (this.buildingRect.left + this.buildingRect.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = this.buildingRect.left + this.buildingRect.width - window.document.documentElement.clientWidth / 3;
      } else {
        posX = this.buildingRect.left + this.buildingRect.width;
      }
      if (this.buildingRect.top + this.buildingRect.height / 3 * 2 + this.popup.clientHeight > document.documentElement.clientHeight) {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2 - this.popup.clientHeight;
      } else {
        posY = this.buildingRect.top + this.buildingRect.height / 3 * 2;
      }

      this.popup.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
      this.popup.querySelector(`.popup-btn`).addEventListener(`click`, function () {
        window.cardModule.popup.classList.add(`popup--hidden`);
      })
    },

    fillBuildingStructure() {
      this.popup.querySelector(`.info__name-number`).textContent = `${this.buildingData.name}`;
      this.fillFloorTemplate();
      this.fillCathedraTemplate();
      this.fillDeaneryTemplate();
    },


    fillFloorTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title floors__title title title--h3";
      heading.textContent = "Этажи";
      FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.flrs).forEach(function (floor, i) {
        let floorFragment = FLOOR_TEMPLATE.cloneNode(true);
        console.log(i);
        floorFragment.querySelector(`.floor-title`).textContent = `${window.utilModule.getSimpleTranslate(i)} Этаж`;
        Object.keys(floor).forEach(function (room) {
          let roomFragment = ROOM_TEMPLATE.cloneNode(true);
          roomFragment.querySelector(`.floor__room-title`).textContent = room;
          roomFragment.querySelector(`.floor__room-desc`).textContent = floor[room];
          floorFragment.insertAdjacentHTML(`beforeend`, roomFragment.outerHTML);
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


    fillDeaneryTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title deaneries__title title title--h3";
      heading.textContent = "Деканаты";
      DEANERY_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.facs).forEach((fac) => {
        let deaneryFragment = DEANERY_TEMPLATE.cloneNode(true);
        deaneryFragment.querySelector(`.deanery-title`).textContent = fac;
        this.buildingData.facs[fac].forEach((room) => {
          let roomFragment = document.createElement(`li`);
          roomFragment.className = `structure__rooms-list-item`;
          roomFragment.textContent = `${room}`;
          deaneryFragment.querySelector(`.structure__rooms-list`).appendChild(roomFragment);
        })
        DEANERY_CONTAINER.insertAdjacentHTML(`beforeend`, deaneryFragment.outerHTML);
      })
    }
  };
})();
