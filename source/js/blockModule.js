const ROOM_TEMPLATE = document.querySelector('#room').content.querySelector('.room-container');
const FLOOR_TEMPLATE = document.querySelector('#floor').content.querySelector('.floor');
const FLOORS_TEMPLATE = document.querySelector('#floors').content.querySelector('.floors');
const CARD = document.querySelector(`.card`);

// for (let i = 1; i < 5; i++) {
//   let campus = {
//     id: i,
//     address: `Лиственничная аллея, 4а`,
//     blocks: [
//       {
//         floors: [
//           [
//             {101: `Лекционная`}
//           ]
//         ]
//       }
//       // cathedra: [
//       //   {
//       //     name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
//       //   },
//       //   {
//       //     name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
//       //   }
//       // ],
//       // deanery: {
//       //   name: `Деканат технологического факультета`,
//       //   floor: 3,
//       //   rooms: [301,302, 329]
//       // }
//     ]
//   }
//   //buildings.push(campus);
// }

class Entity { //Назване комнаты
  title;
  number;

  constructor(title, number) {
    this.title = title;
    this.number = number;
  }

  build(template,className){
    let fragment = template.cloneNode(true);
    fragment.querySelector(`.${className}`).textContent = this.title + ' '+ this.number;
    return fragment.outerHTML;
  }
}

class ExtendEntity extends Entity{//Этаж
  number;
  entities;

  constructor(number,title) {
    super(title)
    this.number = number;
    this.entities = [];
  }

  addEntity(entity){
    this.entities.push(entity);
  }

  build(container, template, className){
    container.innerHTML = ``;
    this.entities.forEach((entity)=>{
      console.log(container);
      container.insertAdjacentHTML('beforeend', entity.build(template,className));
    })
    return container.outerHTML;
  }
}

class Block extends ExtendEntity {//Блок
  extEntities;
  HTMLs;

  constructor(title) {
    super(title);

    this.extEntities = [];
    this.HTMLs = [];
  }

  addExtEntity(extEntity) {
    this.extEntities.push(extEntity);
  }

  build(container, template){
    let fragment = template.cloneNode(true);
    this.extEntities.forEach((exEntity)=>{
      container.insertAdjacentHTML('beforeend', exEntity.build(fragment,ROOM_TEMPLATE,'room'));
    })
  }
}

class BuildingCard {
  type;
  blocks;//HTML

  constructor(type, title) {
    this.type = type;
    this.blocks = [];
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  buildHTML(template) {
    let fragment = template.cloneNode(true);
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].build(fragment,FLOOR_TEMPLATE);
    }

    CARD.querySelector(`.address`).textContent = this.address;
    CARD.insertAdjacentHTML(`beforeend`, fragment.outerHTML);
  }
}
let card = new BuildingCard('Корпус', '1');

let buildings = {
  id: 1,
  address: `sdfadasdasd`,
  blocks:[
    {
      floors: [
        [
          {101: `Лекционная`},
          {102: `Уборная`}
        ],
        [
          {201: `Лекционная`},
          {202: `Уборная`}
        ]
      ]
    }
  ]
};

buildings.blocks.forEach((block)=>{//Берем Блок
  Object.keys(block).forEach((key)=>{//Берем Блок Этажи
    let container = new Block(key);
    block[key].forEach((array)=>{ //Берем этаж
      let objExtEntity = new ExtendEntity(`1`,`один`);
      array.forEach((extEntity)=>{ //Берем комнату сущность
        Object.keys(extEntity).forEach((entity)=>{ //Берем подсущности
          let objEntity = new Entity(entity, extEntity[entity]);
          objExtEntity.addEntity(objEntity);
        });
      })
      container.addExtEntity(objExtEntity);
    })
    console.log(container)
    card.addBlock(container);
    card.buildHTML(FLOORS_TEMPLATE);
  })
})
