## Переходим к содержимому зданий
До сих пор мы совсем не касались информации, которая должна быть показана кроме названия и адреса в зданиях. Давай изменим это.

Начнем со зданий, так как ты уже касался этого. На данный момент мы знаем, что в здании у нас будут аудитории/комнаты, деканаты и кафедры.

Если подумать, то можно решить, что комнаты, деканаты, кафедры и всё такое может располагаться только на этажах, то есть они находятся "внутри" этажей, принадлежат этажам.

Таким образом, у каждого здания должен быть массив этажей и у каждого этажа, в свою очередь, будет набор каких-то других сущностей.

Создадим класс `FloorEntity` определяющий этаж. При создании ему так же на вход будут поступать какие-то данные из которых мы будем брать нужную информацию.
На данный момент у этажа будет номер и, собственно, сущности которые располагаются на этаже. Номер мы задаем не в виде числа, потому, что есть такая штука
как цокольные этажи, мансарды, подвалы и т.п. Так же у нас будет массив сущностей, разбитый по типам сущностей.
```ecmascript 6
  class FloorEntity {
    number;
    entities;

    constructor(data) {
      this.number = data.number;
      this.entities = {
        rooms: [],
        deaneries: [],
        cathedrae: [],
      }
    }
  }
```

Дальше определим класс сущности комнаты. Пусть у нее так же будет 
- номер (строка потому, что есть всякие 101а, 102бис и т.п.)
- название (ну мало ли...)
- роль (лекционная аудитория, туалет и т.п.)
```ecmascript 6
  class RoomEntity {
    number;
    title;
    role;

    constructor(data) {
      this.number = data.number;
      this.title = data.title ?? '';
      this.role = data.role ?? '';
    }
  }
```

Определим оставшиеся сущности, для простоты пока у них будут только названия
```ecmascript 6
  class DeaneryEntity {
    title;

    constructor(data) {
      this.title = data.title;
    }
  }

  class CathedraEntity {
    title;

    constructor(data) {
      this.title = data.title;
    }
  }
```

Далее будем опираться на такую модель данных для здания:
```ecmascript 6
let building= {
  title: `Корпус №1`,
  address: `Лиственничная аллея 10`,
  floors: [
    {
      number: `1`,
      rooms: [
        {
          number: `101`,
          title: `Лекционная №1`,
          role: `Лекционная аудитория`,
        }
      ],
      deaneries: [
        {
          title: `Деканат экономического факультета`
        }
      ]
    },
    {
      number: `2`,
      rooms: [
        {
          number: `201`,
          title: `Лаборатория №1`,
          role: `Лаборатория`,
        },
        {
          number: `202`,
          title: `Лаборатория №2`,
          role: `Лаборатория`,
        },
        {
          number: `203`,
          title: `Лаборатория №3`,
          role: `Лаборатория`,
        }
      ],
      cathedrae: [
        {
          title: `Кафедра информатики`
        },
        {
          title: `Кафедра экономической безопасности`
        },
      ]
    }
  ]
}
```
То есть у здания может быть массив этажей, у каждого этажа могут быть массивы комнат, деканатов, кафедр. 
  
Теперь, когда у нас есть всё для этажа, надо добавить этажи в здание. Добавим свойство `floors` и метод для добавления уже готового объекта этажа. 
У нас получается такой класс: 
```ecmascript 6
  class BuildingEntity extends MapEntity {
    address;
    floors;

    constructor(data) {
      super(data);

      this.address = data.address;
      this.floors = [];

      if (typeof data.floors !== 'undefined') {
        data.floors.forEach(entityData => this.addFloor(entityData));
      }
    }

    addFloor(entityData) {
      this.floors.push(new FloorEntity(entityData));
    }
  }
```

вот в этой конструкции
```ecmascript 6
      if (typeof data.floors !== 'undefined') {
        data.floors.forEach(entityData => this.addFloor(entityData));
      }
```
Мы проверяем, что в данных, переданных в конструктор вообще есть поле `floors` и если есть, то изначально считая, что это массив - для каждого элемента массива
создаем и добавляем объекты этажей.

Теоретически, можно было тут написать вот так:
```ecmascript 6
      if (typeof data.floors !== 'undefined') {
        data.floors.forEach(entityData => this.floors.push(new FloorEntity(entityData)));
      }
```
и не делать метод `addFloor()` но это неправильно. Лучше на каждое такое действие как добавление, удаление сущностей делать отдельный метод. 
Кроме того, что это более наглядно (имя метода говорит за себя) это еще и открывает путь для дополнительных действий внутри метода добавления без изменения 
существующего кода. Насчет этого мы посмотрим позже.

Теперь нам надо реализовать добавление комнат, деканатов и кафедр в этаж. Код получается практически таким же как при добавлении этажей в здание:
```ecmascript 6
  class FloorEntity {
    number;
    entities;

    constructor(data) {
      this.number = data.number;
      this.entities = {
        rooms: [],
        deaneries: [],
        cathedrae: [],
      }

      if (typeof data.rooms !== 'undefined') {
        data.rooms.forEach(entityData => this.addRoom(entityData));
      }

      if (typeof data.deaneries !== 'undefined') {
        data.deaneries.forEach(entityData => this.addDeanery(entityData));
      }

      if (typeof data.cathedrae !== 'undefined') {
        data.cathedrae.forEach(entityData => this.addCathedra(entityData));
      }
    }

    addRoom(entityData) {
      this.entities.rooms.push(new RoomEntity(entityData));
    }

    addDeanery(entityData) {
      this.entities.deaneries.push(new DeaneryEntity(entityData));
    }

    addCathedra(entityData) {
      this.entities.cathedrae.push(new CathedraEntity(entityData));
    }
}
``` 

И вот тут мы вспоминаем, что нам же надо показать информацию о здании, а значит информацию о каждом этаже и о тех сущностях, которые у нас есть на этаже!

Всё, что для этого надо - добавить методы `show()` в классы этажа и других сущностей, которые бы знал как показывать эти сущности, 
а потом из метода `show()` здания для каждого этажа вызвать метод `show()` который, в свою, очередь для каждой сущности вызовет ее метод `show()`  

Для краткости я тут покажу только методы `show()`:
```ecmascript 6
  class FloorEntity {
    show() {
      console.log(`    Этаж ${this.number}`);
      if (this.entities.rooms.length) {
        console.log(`      Комнаты`);
        this.entities.rooms.forEach(entity => entity.show());
      }

      if (this.entities.deaneries.length) {
        console.log(`      Деканаты`);
        this.entities.deaneries.forEach(entity => entity.show());
      }

      if (this.entities.cathedrae.length) {
        console.log(`      Кафедры`);
        this.entities.cathedrae.forEach(entity => entity.show());
      }
    }
  }

  class RoomEntity {
    show() {
      console.log(`        Комната: ${this.number} ${this.title} ${this.role}`)
    }
  }

  class DeaneryEntity {
    show() {
      console.log(`        Деканат: ${this.title}`)
    }
  }

  class CathedraEntity {
    show() {
      console.log(`        Кафедра: ${this.title}`)
    }
  }
```

## Объединяем это
Хотелось бы добавить еще один нюанс. 

Сейчас у нас наши классы этажей, комнат, деканатов и кафедр хоть и имеют метод `show()` но по факту не объединены
одним родительским классом. Давай добавим такой класс. Назовем его `ShowableEntity` - то есть "показываемая сущность"
```ecmascript 6
  class ShowableEntity {
    show() {
    }
  }
```
А вот этот класс еще можем объединить под одной "крышей" еще и наши здания, пруды и поля. Все, что надо это наследовать наш `MapObject` от него
```ecmascript 6
class MapObject extends ShowableEntity
``` 

Правда теперь надо во все конструкторы наших классов где еще нет вызова конструктора родителя добавить этот вызов `super()`. Например в `MapObject` это так:
```ecmascript 6
  class MapEntity extends ShowableEntity {
    title = ``;

    constructor(data) {
      super();
      this.title = data.title;
    }

    show() {
      console.log(`   ${this.title}`);
    }
  }
```

см. [example3.html](example3.html)

- [предыдущая часть](readme2.md)
- [следующая часть](readme4.md)
