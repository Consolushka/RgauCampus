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

      campusNumber--;

      let campus = window.dataModule.campuses[campusNumber];

      this.fillFloorTemplate(campus);
      this.fillCathedraTemplate(campus);
      this.fillDeaneryTemplate(campus);

      this.popup.classList.remove(`popup--hidden`);

      let domEl = object.getBoundingClientRect();
      let posX, posY;
      if (domEl.left + domEl.width > window.document.documentElement.clientWidth / 3 * 2) {
        posX = domEl.left + domEl.width - window.document.documentElement.clientWidth / 3;
      } else {
        posX = domEl.left + domEl.width;
      }
      var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      if (domEl.top + domEl.height / 3 * 2 + this.popup.clientHeight > document.documentElement.clientHeight) {
        console.log(`much more`)
        posY = document.documentElement.clientHeight + window.pageYOffset - this.popup.clientHeight;
      } else {
        posY = domEl.top + domEl.height / 3 * 2;
      }

      this.popup.setAttribute(`style`, `left: ${posX}px; top: ${posY}px`);
      this.popup.querySelector(`.popup-btn`).addEventListener(`click`, function () {
        window.cardModule.popup.classList.add(`popup--hidden`);
      })
    },


    toggleTab(type, status) {
      this.popup.querySelector(`a.nav-link[href="#${type}"]`).hidden = status;
      this.popup.querySelector(`.tab-pane#${type}`).hidden = status;
      if (!status) {
        this.popup.querySelectorAll('a.nav-link').forEach((link) => {
          link.classList.remove('active');
          link.classList.remove('show');
        })
        this.popup.querySelectorAll('.tab-pane').forEach((pane) => {
          pane.classList.remove('active');
          pane.classList.remove('show');
          pane.classList.add('fade');
        })
        this.popup.querySelector(`a.nav-link[href="#${type}"]`).classList.add('active');
        this.popup.querySelector(`a.nav-link[href="#${type}"]`).classList.add('show');
        this.popup.querySelector(`.tab-pane#${type}`).classList.add('active');
        this.popup.querySelector(`.tab-pane#${type}`).classList.add('show');
        this.popup.querySelector(`.tab-pane#${type}`).classList.remove('fade');
      }
    },

    hideTab(type, status) {
      this.toggleTab(type, true);
    },

    showTab(type, status) {
      this.toggleTab(type, false);
    },

    fillFloorTemplate(campus) {
      if (typeof campus.floors === 'undefined') {
        this.hideTab('floors');
        this.showTab('cathedra');
        return;
      }

      this.showTab('floors');
      let heading = document.createElement("h2");
      heading.className = "info-title floors__title title title--h3";
      heading.textContent = "Этажи";
      FLOOR_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      campus.floors.forEach(function (floor, i) {
        let floorFragment = FLOOR_TEMPLATE.cloneNode(true);
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
      if (typeof campus.cathedra === 'undefined') {
        this.hideTab('cathedra');
        this.showTab('deanery');
        return;
      }
      this.showTab('cathedra');
      let heading = document.createElement("h2");
      heading.className = "info-title cathedras__title title title--h3";
      heading.textContent = "Кафедры";
      CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      campus.cathedra.forEach(function (cathedra) {
        let cathedraFragment = CATHEDRA_TEMPLATE.cloneNode(true);
        cathedraFragment.querySelector(`.cathedra-title`).textContent = cathedra.name;
        CATHEDRA_CONTAINER.insertAdjacentHTML(`beforeend`, cathedraFragment.outerHTML);
      })
    },


    fillDeaneryTemplate(campus) {
      if (typeof campus.floors === 'undefined') {
        console.log(`und`);
        if (typeof campus.cathedra === 'undefined') {
          this.showTab('deanery');
        } else {
          this.showTab('cathedra');
        }
      } else {
        this.showTab('floors');
      }
      if (typeof campus.deanery === 'undefined') {
        this.hideTab('deanery');
        return;
      }

      let heading = document.createElement("h2");
      heading.className = "info-title deaneries__title title title--h3";
      heading.textContent = "Деканаты";
      DEANERY_CONTAINER.insertAdjacentHTML(`beforeend`, heading.outerHTML);

      let deaneryFragment = DEANERY_TEMPLATE.cloneNode(true);
      deaneryFragment.querySelector(`.deanery-title`).textContent = campus.deanery.name;
      deaneryFragment.querySelector(`.deanery-floor`).textContent = `Кафедра находится на ${window.utilModule.getThTranslate(campus.deanery.floor).toLowerCase()} этаже`;

      (typeof campus.deanery !== 'undefined') && campus.deanery.rooms.forEach(function (room) {
        let roomFragment = document.createElement(`li`);
        roomFragment.className = `deanery__rooms-list-item`;
        roomFragment.textContent = `${room}`;
        deaneryFragment.querySelector(`.deanery__rooms-list`).appendChild(roomFragment);
      })
      DEANERY_CONTAINER.insertAdjacentHTML(`beforeend`, deaneryFragment.outerHTML);
    }
  };
})();
