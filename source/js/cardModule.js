'use strict';
class BuildingElement {
  constructor(el) {
    this.element = el;
    this.type = el.dataset.type;
    this.rect = this.element.getBoundingClientRect();
    this.FillFullInfo(el.dataset.number);
  }

  FillFullInfo(name) {
    window.dataModule.buildings[this.type].forEach((data) => {
      if (data.name.toLowerCase() === name.toLowerCase()) {
        console.log(data);
        this.name = data.name;
        this.address = data.address;
        this.extra = data.extra;
        if (this.type === "learning") {
          this.flrs = data.flrs;
          this.facs = data.facs;
          this.owners = data.owners;
        }
      }
    });
  }
}

(function () {

  const FLOOR_TEMPLATE = document.querySelector(`#floorTempl`).content.querySelector(`.floor`);
  const CATHEDRA_TEMPLATE = document.querySelector(`#cathedraTempl`).content.querySelector(`.cathedra`);
  const FACS_TEMPLATE = document.querySelector(`#facTempl`).content.querySelector(`.fac`);
  const FLOOR_CONTAINER = document.querySelector(`.js-floors`);
  const CATHEDRA_CONTAINER = document.querySelector(`.js-cathedra`);
  const FACS_CONTAINER = document.querySelector(`.js-facs`);
  window.cardModule = {
    popupObject: document.querySelector(`.js-popup-all`),

    show(object) {
      this.building = new BuildingElement(object);
      console.log(this.building);

      this.ClearPopupAndFillNew();

      this.popupObject.classList.remove(`popup--hidden`);
      if (window.utilModule.windowWidth >= 720) {
        this.locatePopup();
      }
      this.listenClosePopup();
    },

    ClearPopupAndFillNew() {
      FLOOR_CONTAINER.innerHTML = ``;
      CATHEDRA_CONTAINER.innerHTML = ``;
      FACS_CONTAINER.innerHTML = ``;

      this.popupObject.querySelector(`.js-popup-extra`).classList.add("visually-hidden");
      this.popupObject.querySelector(".nav-tabs").classList.remove("visually-hidden");
      this.popupObject.querySelector(".js-popup-empty-building").classList.add("visually-hidden");

      this.fillBuildingStructure();
    },

    fillBuildingStructure() {
      this.popupObject = document.querySelector(`.js-popup-all`);

      this.FillGeneralInfo();

      if (!this.building.flrs || Object.keys(this.building.flrs).length === 0) {
        this.showEmptyInfo();
      } else {
        this.fillEntities();
      }
    },

    FillGeneralInfo() {
      this.popupObject.querySelector(`.info__name-number`).textContent = `${this.building.name}`;
      this.popupObject.querySelector(`.js-popup-purpose`).textContent = window.utilModule.BUILDING_PURPOSE_TRANSLATOR[this.building.type];
      this.popupObject.querySelector(`.js-popup-address`).textContent = `${this.building.address}`;
      if (this.building.extra != "None") {
        this.popupObject.querySelector(`.js-popup-extra`).classList.remove("visually-hidden");
        this.popupObject.querySelector(`.js-popup-extra`).textContent = this.building.extra;
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

      this.building.flrs.forEach((floor) => {
        console.log(floor.number);
        let floorFragment = FLOOR_TEMPLATE.cloneNode(true);
        floorFragment.querySelector(`.floor-title`).textContent = `${window.utilModule.getSimpleTranslate(floor.number)} Этаж`;
        floorFragment = this.insertRoomsIntoContainer(floor.rooms, floorFragment);
        FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, floorFragment.outerHTML);
      })
    },

    insertRoomsIntoContainer(data, container) {
      data.forEach((room) => {
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

      this.building.owners.forEach((cathedra) => {
        let cathedraFragment = CATHEDRA_TEMPLATE.cloneNode(true);
        cathedraFragment.querySelector(`.cathedra-title`).textContent = cathedra.name;
        cathedraFragment = this.insertRoomsIntoContainer(cathedra.rooms, cathedraFragment);
        CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, cathedraFragment.outerHTML);
      })
    },


    fillFacsTemplate() {
      let heading = document.createElement("h2");
      heading.className = "info-title fac__title title title--h3";
      heading.textContent = "Факультеты и Институты";
      FACS_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      this.building.facs.forEach((fac) => {
        let facFragment = FACS_TEMPLATE.cloneNode(true);
        facFragment.querySelector(`.fac-title`).textContent = fac.name;
        facFragment = this.insertRoomsIntoContainer(fac.rooms, facFragment);
        FACS_CONTAINER.insertAdjacentHTML(`beforeend`, facFragment.outerHTML);
      })
    },

    locatePopup() {
      let posX = this.building.rect.left + this.building.rect.width,
        posY = this.building.rect.top + this.building.rect.height / 3 * 2 + window.pageYOffset;
      this.popupObject.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
    },

    listenClosePopup() {
      this.popupObject.querySelector(`.js-popup-close`).addEventListener(`click`, this.closePopup);
      window.addEventListener(`keydown`, this.checkClosing);
    },

    checkClosing(evt) {
      if (evt) {
        if (evt.key === "Escape") {
          window.cardModule.closePopup();
        }
      }
    },

    closePopup() {
      window.cardModule.popupObject.classList.add(`popup--hidden`);
      window.cardModule.popupObject.querySelector(`.js-popup-close`).removeEventListener(`click`, window.cardModule.closePopup);
      window.removeEventListener(`keydown`, window.cardModule.checkClosing);
    }
  };
})();
