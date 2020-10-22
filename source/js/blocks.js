class MapEntity {
  title = ``;

  constructor(data) {
    this.title = data.title;
  }

  show() {
    console.log(`   ${this.title}`);
  }
}

class BuildingEntity extends MapEntity {
  address;

  constructor(data) {
    super(data);

    this.address = data.address;
  }
}

class PondEntity extends MapEntity {
  show() {
    console.log(` Пруд`);
    super.show();
  }
}

class FieldEntity extends MapEntity {
  show() {
    console.log(` Поле`);
    super.show();
  }
}

const dbData = {
  fields: [
    {
      title: 'Опытное поле №1',
    },
    {
      title: 'Опытное поле №2',
    }
  ],
  buildings: [
    {
      title: `Ректорат`,
      address: `Лиственничная аллея 1`,
    },
    {
      title: `Концертный зал`,
      address: `ул. Тихая 5`,
    },
    {
      title: `Корпус №1`,
      address: `Лиственничная аллея 10`,
    }
  ],
  ponds: [
    {
      title: 'Пруд №1',
    },
    {
      title: 'Пруд №2',
    }
  ]
};

let mapEntities = [];

dbData.buildings.forEach(data => {
  mapEntities.push(new BuildingEntity(data));
});

dbData.fields.forEach(data => {
  mapEntities.push(new FieldEntity(data));
});

dbData.ponds.forEach(data => {
  mapEntities.push(new PondEntity(data));
});

mapEntities.forEach(entity => {
  entity.show();
});
