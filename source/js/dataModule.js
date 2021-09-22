'use strict';

  class BuildingData {
  constructor(data) {
    this.name = data.name
    this.address = data.address
    this.extra = data.extra
  }
}

class LearningBuildingData extends BuildingData{
  constructor(data) {
    super(data);
    this.flrs = data.flrs;
    this.facs = data.facs;
    this.owners = data.owners;
  }
}

(function () {


  let CampusCount = 37;

  window.dataModule = {
    buildings: {
      "learning": [],
      "admin": [],
      "culture": [],
      "sport": [],
      "leaving": []
    },
    mockData() {
      for (let i = 1; i < CampusCount + 1; i++) {
        let campus = {
          id: i,
          address: `Лиственничная аллея, 4а`,
          floors: [
            {
              101: `Лекционная`,
              103: `Уборная`
            },
            {
              201: `Лекционная`,
              203: `Уборная`
            }
          ],
          cathedra: [
            {
              name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
            },
            {
              name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
            }
          ],
          deanery: {
            name: `Деканат технологического факультета`,
            floor: 3,
            rooms: [301, 302, 329]
          }
        };
        this.buildings.push(campus);
      }
    },
    readJsonData(output, file) {
      var rawFile = new XMLHttpRequest();
      let data;
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
          this.filterBuildingsByPurpose(JSON.parse(rawFile.responseText));
        }
      }
      rawFile.send(null);
    },
    filterBuildingsByPurpose(buildings) {
      buildings.forEach((building) => {
        this.buildings[building.purpose].push(this.buildingsFactory(building));
      });
    },
    buildingsFactory(building) {
      if (building.purpose === "learning") {
        return new LearningBuildingData(building)
      }
      return new BuildingData(building)
    }
  };
})();
