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

      let purpose = String(this.buildingData.purpose)[0].toUpperCase() + String(this.buildingData.purpose).slice(1);

      this.popupObject.querySelector(`.info__name-number`).textContent = `${this.buildingData.name}`;
      this.popupObject.querySelector(`.js-popup-purpose`).textContent = purpose;
      if (this.buildingData.extra) {
        this.popupObject.querySelector(`.js-popup-extra`).classList.remove("visually-hidden");
        this.popupObject.querySelector(`.js-popup-extra`).textContent = this.buildingData.extra;
      }

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


    fillCathedraTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title cathedras__title title title--h3";
      heading.textContent = "Кафедры";
      CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(this.buildingData.owners).forEach((cathedra) => {
        let cathedraFragment = CATHEDRA_TEMPLATE.cloneNode(true);
        cathedraFragment.querySelector(`.cathedra-title`).textContent = cathedra;
        cathedraFragment = this.insertRoomsIntoContainer(this.buildingData.owners[cathedra], cathedraFragment);
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
        facFragment = this.insertRoomsIntoContainer(this.buildingData.facs[fac], facFragment);
        FACS_CONTAINER.insertAdjacentHTML(`beforeend`, facFragment.outerHTML);
      })
    },

    insertRoomsIntoContainer(data, container) {
      data.forEach((room) => {
        let roomFragment = document.createElement(`li`);
        roomFragment.className = `info__rooms-list-item`;
        roomFragment.textContent = Object.keys(room)[0];
        roomFragment.setAttribute(`title`, `${room[Object.keys(room)[0]]}`);
        container.querySelector(`.info__rooms-list`).appendChild(roomFragment);
      });
      return container;
    }
  }
})();
