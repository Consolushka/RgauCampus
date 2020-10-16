class Entity {
  title;

  constructor(title) {
    this.title = title;
  }

  buildHtml() {
    return this.title;
  }
}

class CardBlock extends Entity {
  entities;

  constructor(title) {
    super(title);

    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  buildHtml() {
    let result = this.title + "\n\n";

    this.entities.forEach(
      function (entity) {
        result += entity.buildHtml() + "\n\n";
      }
    );

    return result;
  }
}

class Room extends Entity {
  number;

  constructor(title, number) {
    super(title);

    this.number = number;
  }

  buildHtml() {
    return this.number + ': ' + super.buildHtml();
  }
}

class Cathedra extends Entity {
  buildHtml() {
    return super.buildHtml();
  }
}

class BuildingCard extends Entity {
  blocks;

  constructor(title) {
    super(title);

    this.blocks = [];
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  buildHtml() {
    let result = this.title + "\n\n";

    this.blocks.forEach(
      function (block) {
        result += block.buildHtml() + "\n\n";
      }
    );

    return result;
  }
}

let floor1 = new CardBlock('1 Этаж');
floor1.addEntity(new Room('Туалет', 101));
floor1.addEntity(new Cathedra('Кафедра информатики'));
floor1.addEntity(new Room('Столовая', 102));
floor1.addEntity(new Room('Лекционная', 103));

let floor2 = new CardBlock('2 Этаж');
floor2.addEntity(new Room('Туалет', 201));
floor2.addEntity(new Room('Столовая', 202));
floor2.addEntity(new Room('Лекционная', 203));

let buildingCard=new BuildingCard('111');

buildingCard.addBlock(floor1);
buildingCard.addBlock(floor2);

console.log(buildingCard.buildHtml());
