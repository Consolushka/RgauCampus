const TEMPLATE = document.querySelector('#room').content.querySelector('.room-container');
const FLOOR_TEMPLATE = document.querySelector('#floor').content.querySelector('.floor');
const CONTAINER = document.querySelector('.card');

let buildings = {
  id: 1,
  address: `sdfadasdasd`,
  blocks:[
    {
      floors: [
        [
          {101: `Лекционная`}
        ]
      ]
    }
  ]
};

for (let i = 1; i < 5; i++) {
  let campus = {
    id: i,
    address: `Лиственничная аллея, 4а`,
    blocks: [
      {
        floors: [
          [
            {101: `Лекционная`},
            {103: `Уборная`}
          ],
          [
            {201: `Лекционная`},
            {203: `Уборная`}
          ]
        ]
      }
      // cathedra: [
      //   {
      //     name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
      //   },
      //   {
      //     name: `Сельскохозяйственных мелиораций, лесоводства и землеустройства`
      //   }
      // ],
      // deanery: {
      //   name: `Деканат технологического факультета`,
      //   floor: 3,
      //   rooms: [301,302, 329]
      // }
    ]
  }
  //buildings.push(campus);
}

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
    this.entities.forEach((entity)=>{
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
      container.insertAdjacentHTML('beforeend', exEntity.build(fragment,TEMPLATE,'room'));
      console.log(container);
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

  buildHTML(container) {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].build(CONTAINER,FLOOR_TEMPLATE);
    }
    container.querySelector(`.address`).textContent = this.address;
  }
}

let entity = new Entity('Лекционная', '101');
let room201 = new ExtendEntity(entity.number, entity.title);
room201.addEntity(entity);
let floor = new Block(`'floors`);
floor.addExtEntity(room201);
let card = new BuildingCard('Корпус', '1');
card.addBlock(floor);
card.buildHTML(CONTAINER);
// let room202 = new ExtendEntity('202', entity.build());
// let floor2 = new Block('second');
// floor2.addExtEntity(room201);
// floor2.addExtEntity(room202);



// buildings[0].blocks.forEach((block, i) => {// Кол-во Блоков
//   Object.keys(block).forEach((key)=>{ // Блоки
//     block[key].forEach((exEntity,i) => { //Этажи
//       let floor = new ExtendEntity(i,'asd');
//       exEntity.forEach((entity1)=>{ //Комнаты
//         Object.keys(entity1).forEach((entKey)=>{
//           let room = new Entity(entKey,entity1[entKey]);
//           floor.addEntity(room);
//         })
//       })
//       block1.addExtEntity(floor);
//     })
//   })
// })

