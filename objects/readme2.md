## Разное отображение
До сих пор сущности всех типов у нас показывались одинаково, так как наследовали метод `show()` от родительского класса `MapEntity`

В реальности такого конечно не будет. Для того, чтобы это поменять довольно очевидно то, что надо поменять метод `show()` у каждого класса:
```ecmascript 6
  class BuildingEntity extends MapEntity {
    show() {
      console.log(` Здание`);
      super.show();
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
``` 
В этом примере для показа названия мы вызываем "родительский" метод `show()` класса `MapEntity`. В реальности именно для показа чего-то... такое редко будет использоваться,
но вообще вызов родительского метода для того, чтобы не переписывать одинаковый функционал это одна их краеугольных фич наследования

## Добавляем адрес
Давай усложним задачу и добавим поле "адрес" для зданий. У прудов и полей он вряд ли будет, а вот у здания - наверняка  
```ecmascript 6
  class BuildingEntity extends MapEntity {
    address;

    constructor(title, address) {
      super(title);

      this.address = address;
    }

    show() {
      console.log(` Здание`);
      console.log(`   ${this.title}, ${this.address}`);
    }
  }
```

Из типов БД оставим первый для простоты и модифицируем его так, чтобы добавить туда адрес для зданий, вот так:
```ecmascript 6
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
      ]
```

Тогда надо модифицировать блок создания сущностей зданий
```ecmascript 6
    dbData.buildings.forEach(data => {
      mapEntities.push(new BuildingEntity(data.title, data.address));
    });
```

А теперь давай задумаемся... А что будет, когда нам надо будет добавить еще какую-то информацию? Координаты? Комнаты? Комендантов? Неужели каждый раз модифицировать
этот блок и плодить количество параметров конструктора?

На самом деле конечно же нет. В данном конкретном случае мы создаем объект из уже какой-то готовой и известной структуры, полученной из БД. Нам просто надо сделать так,
чтобы сам __КЛАСС__ знал как загрузить нужные ему данные из этой структуры. То есть модифицируем наши классы так:
```ecmascript 6
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
```

То есть мы поменяли только конструкторы `MapEntity` и `BuildingEntity` и теперь получается, что сами классы у нас знают как обработать поступившие им данные.
Это помогает нам упростить создание каждого типа объекта и сделать их __ОДИНАКОВЫМИ__ с точки зрения вызова. Позже мы посмотрим как это еще упростить и сделать более гибким
```ecmascript 6
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
```

см. [example2.html](example2.html)

- [предыдущая часть](readme1.md)
- [следующая часть](readme3.md)
