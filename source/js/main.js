'use strict';
window.dataModule.readJsonData("buildings", "js/buildings-data.json");

if (document.documentElement.clientWidth < 1200) {
  window.menuModule.listenShow();
}

window.objectsModule.addEvents();
