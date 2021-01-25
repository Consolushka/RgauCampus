'use strict';

(function () {
  const FLOOR_TEMPLATE = document.querySelector(`#floorTempl`).content.querySelector(`.floor`);
  const ROOM_TEMPLATE = document.querySelector(`#roomTempl`).content.querySelector(`.floor__room`);
  const FLOOR_CONTAINER = document.querySelector(`.js-floors`);
  const CATHEDRA_TEMPLATE = document.querySelector(`#cathedraTempl`).content.querySelector(`.cathedra`);
  const DEANERY_TEMPLATE = document.querySelector(`#deaneryTempl`).content.querySelector(`.deanery`);
  const CATHEDRA_CONTAINER = document.querySelector(`.js-cathedra`);
  const DEANERY_CONTAINER = document.querySelector(`.js-deanery`);


  window.cardModule = {
    popup: document.querySelector(`.info`),


    show(object) {
      let campusNumber = object.dataset.number;

      this.popup.querySelector(`.info__name-number`).textContent = `${campusNumber}`;
      this.popup.querySelector(`.info__floors`).innerHTML = ``;
      this.popup.querySelector(`.info__cathedras`).innerHTML = ``;
      this.popup.querySelector(`.info__deaneries`).innerHTML = ``;

      let building = window.dataModule.campuses[campusNumber];
      console.log(building);

      this.fillFloorTemplate(building);
      this.fillCathedraTemplate(building);
      this.fillDeaneryTemplate(building);

      this.popup.classList.remove(`popup--hidden`);

      let domEl = object.getBoundingClientRect();
      let posX, posY;
      if (domEl.left + domEl.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = domEl.left + domEl.width - window.document.documentElement.clientWidth / 3;
      } else {
        posX = domEl.left + domEl.width;
      }
      if (domEl.top + domEl.height / 3 * 2 + this.popup.clientHeight > document.documentElement.clientHeight) {
        posY = domEl.top + domEl.height / 3 * 2 - this.popup.clientHeight;
      } else {
        posY = domEl.top + domEl.height / 3 * 2;
      }

      this.popup.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
      this.popup.querySelector(`.popup-btn`).addEventListener(`click`, function () {
        window.cardModule.popup.classList.add(`popup--hidden`);
      })
    },


    fillFloorTemplate(campus) {
      let heading = document.createElement("h2");
      heading.className = "info-title floors__title title title--h3";
      heading.textContent = "Этажи";
      FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(campus.flrs).forEach(function (floor, i) {
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


    fillCathedraTemplate(campus) {
      let heading = document.createElement("h2");
      heading.className = "info-title cathedras__title title title--h3";
      heading.textContent = "Кафедры";
      CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(campus.cath).forEach(function (cathedra) {
        let cathedraFragment = CATHEDRA_TEMPLATE.cloneNode(true);
        cathedraFragment.querySelector(`.cathedra-title`).textContent = cathedra;
        campus.cath[cathedra].forEach((room)=>{
          let roomFragment = document.createElement(`li`);
          roomFragment.className = `deanery__rooms-list-item`;
          roomFragment.textContent = `${room}`;
          cathedraFragment.querySelector(`.cathedra__rooms-list`).appendChild(roomFragment);
        })
        CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, cathedraFragment.outerHTML);
      })
    },


    fillDeaneryTemplate(campus) {
      let heading = document.createElement("h2");
      heading.className = "info-title deaneries__title title title--h3";
      heading.textContent = "Деканаты";
      DEANERY_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      Object.keys(campus.facs).forEach((fac)=>{
        let deaneryFragment = DEANERY_TEMPLATE.cloneNode(true);
        deaneryFragment.querySelector(`.deanery-title`).textContent = fac;
        campus.facs[fac].forEach((room)=>{
          let roomFragment = document.createElement(`li`);
          roomFragment.className = `deanery__rooms-list-item`;
          roomFragment.textContent = `${room}`;
          deaneryFragment.querySelector(`.deanery__rooms-list`).appendChild(roomFragment);
        })
        DEANERY_CONTAINER.insertAdjacentHTML(`beforeend`, deaneryFragment.outerHTML);
      })
    }
  };
})();
