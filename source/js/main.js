'use strict';
//Наш глобальный объект заполняется псевдо-реальными данными
window.dataModule.readJsonData("js/buildings-data.json");
// При клике на корпус - будет вызываться функция с номером корпуса(номер будет храниться в data-атрибуте)
window.objectsModule.addEvents();
