'use strict';

(function () {
  const FLOOR_TEMPLATE = document.querySelector(`#floorTempl`).content.querySelector(`.floor`);
  const CATHEDRA_TEMPLATE = document.querySelector(`#cathedraTempl`).content.querySelector(`.cathedra`);
  const FACS_TEMPLATE = document.querySelector(`#facTempl`).content.querySelector(`.fac`);
  const FLOOR_CONTAINER = document.querySelector(`.js-floors`);
  const CATHEDRA_CONTAINER = document.querySelector(`.js-cathedra`);
  const FACS_CONTAINER = document.querySelector(`.js-facs`);

  window.building = {

    buildingData: null,
    popupObject: null,

    fillBuildingStructure(data,popup) {
      this.buildingData = data;
      this.popupObject = popup;

      this.resetPopup();

      this.fillGeneralInfo();

      if (!this.buildingData.flrs || Object.keys(this.buildingData.flrs).length === 0) {
        this.showEmptyInfo();
      } else {
        this.fillEntities();
      }
    },

    resetPopup() {
      FLOOR_CONTAINER.innerHTML = ``;
      CATHEDRA_CONTAINER.innerHTML = ``;
      FACS_CONTAINER.innerHTML = ``;

      this.popupObject.querySelector(`.js-popup-extra`).classList.add("visually-hidden");
      this.popupObject.querySelector(".nav-tabs").classList.remove("visually-hidden");
      this.popupObject.querySelector(".js-popup-empty-building").classList.add("visually-hidden");
    },

    fillGeneralInfo(){

      this.popupObject.querySelector(`.info__name-number`).textContent = `${this.buildingData.name}`;
      this.popupObject.querySelector(`.js-popup-purpose`).textContent = window.utilModule.BUILDING_PURPOSE_TRANSLATOR[this.buildingData.purpose];
      this.popupObject.querySelector(`.js-popup-address`).textContent = `${this.buildingData.address}`;
      if (this.buildingData.extra != "None") {
        this.popupObject.querySelector(`.js-popup-extra`).classList.remove("visually-hidden");
        this.popupObject.querySelector(`.js-popup-extra`).textContent = this.buildingData.extra;
      }
    },

    showEmptyInfo(){
      this.popupObject.querySelector(".nav-tabs").classList.add("visually-hidden");
      this.popupObject.querySelector(".js-popup-empty-building").classList.remove("visually-hidden");
    },

    fillEntities(){
      this.fillFloorTemplate();
      this.fillCathedraTemplate();
      this.fillFacsTemplate();
    },

    fillFloorTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title floors__title title title--h3";
      heading.textContent = "Этажи";
      FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.flrs).forEach((floor, i) => {
        let floorFragment = FLOOR_TEMPLATE.cloneNode(true);
        floorFragment.querySelector(`.floor-title`).textContent = `${window.utilModule.getSimpleTranslate(i)} Этаж`;
        floorFragment = this.insertRoomsIntoContainer(this.buildingData.flrs[floor], floorFragment);
        FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, floorFragment.outerHTML);
      })
    },

    insertRoomsIntoContainer(data, container) {
      data.rooms.forEach((room) => {
        let roomFragment = document.createElement(`li`);
        roomFragment.className = `info__rooms-list-item`;
        roomFragment.textContent = room.name;
        roomFragment.setAttribute(`title`, `${room.purpose}`);
        container.querySelector(`.info__rooms-list`).appendChild(roomFragment);
      });
      return container;
    },


    fillCathedraTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title cathedras__title title title--h3";
      heading.textContent = "Кафедры";
      CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      this.buildingData.owners.forEach((cathedra) => {
        let cathedraFragment = CATHEDRA_TEMPLATE.cloneNode(true);
        cathedraFragment.querySelector(`.cathedra-title`).textContent = cathedra.name;
        cathedraFragment = this.insertRoomsIntoContainer(cathedra, cathedraFragment);
        CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, cathedraFragment.outerHTML);
      })
    },


    fillFacsTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title fac__title title title--h3";
      heading.textContent = "Факультеты и Институты";
      FACS_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      this.buildingData.facs.forEach((fac) => {
        let facFragment = FACS_TEMPLATE.cloneNode(true);
        facFragment.querySelector(`.fac-title`).textContent = fac.name;
        facFragment = this.insertRoomsIntoContainer(fac, facFragment);
        FACS_CONTAINER.insertAdjacentHTML(`beforeend`, facFragment.outerHTML);
      })
    }
  }
})();
