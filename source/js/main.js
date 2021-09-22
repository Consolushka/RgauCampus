'use strict';
window.dataModule.readJsonData("buildings", "js/buildings-data.json");
// window.dataModule.filterBuildingsByPurpose(JSON.parse(buildings));

if (document.documentElement.clientWidth < 1200) {
  window.menuModule.listenShow();
}

window.objectsModule.addEvents();
