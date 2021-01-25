'use strict';

(function () {

  let CampusCount = 37;

  window.dataModule = {
    campuses: [],
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
        this.campuses.push(campus);
      }
    },
    readJsonData(file){
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
          this.campuses = JSON.parse(rawFile.responseText);
          console.log(this.campuses);
        }
      }
      rawFile.send(null);
    }
  };
})();
