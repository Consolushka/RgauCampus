## Что насчет HTML?
Мы уже показываем информацию по зданию в консоли. Теперь бы надо показать его в HTML...

Итак, что нам по сути надо? Нам надо, чтобы информация о каждой нашей сущности красиво рисовалась и вставлялась куда-то в DOM. 

То есть у нас две задачи - нарисовать и вставить. Давай поделим их по методам.

Прежде всего расширим наш класс `ShowableEntity` двумя методами:
```ecmascript 6
  class ShowableEntity {
    buildHtml() {
       return null;
    }

    insertHtml(parentContainer) {
      parentContainer.appendChild(this.buildHtml());
    }
  }
```

`buildHtml()` будет строить DOM-элемент для нашей сущности, а `insertHtml()` вставлять его в переданный контейнер.

`insertHtml()` выглядит так, что его не надо менять от наследника к наследнику, а вот `buildHtml()` для каждого типа сущности будет явно свой. 
И когда мы для всех наших сущностей сделаем нормальный `buildHtml()` нам будет достаточно вызвать `insertHtml()` у конкретного, скажем, 
здания и передать ему какой-нибудь `div`-контейнер и у нас всё в нем само нарисуется.  

"Строить" HTML вполне себе да можно по твоему пути - брать какой-то шаблон, клонировать его и в нем уже заменять плейсхолдеры конкретными элементами/значениями.

Сделаем такой шаблон для комнаты:
```html
<template id="roomTemplate">
  <div class="floor__room">
    <span class="floor__room-number js-pc-number">фыв</span>
    <span class="floor__room-title js-pc-title">фыв</span>
    <span class="floor__room-role js-pc-role">asdd</span>
  </div>
</template>
```

#### Некоторое отступление
Судя по всему вас либо не учили, либо еще не успели научить, но при верстке надо отделять классы представления от классов управления и не смешивать роли одних с другими.
Имеется в виду, что классы, которые описывают внешний вид CSS, не должны служить в роли, например, селекторов для js-кода. Представь, что у тебя готовое приложение
с кодом, которое реагирует на клики, что-то там куда-то вставляет и т.д. и т.п. и тут меняется концепция дизайна и тебе надо перетасовать классы верстки, поменять
им названия... Если эти же классы будут использоваться в роли селекторов, то придется еще и как-то менять код js чтобы отразить новые веяния, 
и зачастую это не столь тривиально, а можно этого избежать...

Или случай попроще - надо сделать карточку с другим внешним видом, но такую же по функционалу - наверняка классы представления по БЭМу в ней будут совсем другие, 
а управлять-то ей можно так же.

Поэтому для js-селекторов используют совсем отдельные классы, как правило, начинающиеся с префикса `js-`

#### Возвращаемся к теме
Итак, у нас есть шаблон. Надо построить по нему HTML. Я верстак еще тот, поэтому я буду делать тупо.

```ecmascript 6
  class RoomEntity extends ShowableEntity {
    buildHtml() {
      let entityContainer = document.querySelector('#roomTemplate').content.firstElementChild.cloneNode(true);

      entityContainer.querySelector(`.js-pc-number`).innerText = this.number;
      entityContainer.querySelector(`.js-pc-title`).innerText = this.title;
      entityContainer.querySelector(`.js-pc-role`).innerText = this.role;

      return entityContainer;
    }
  }
```

Для деканатов и кафедр поступим подобным образом, например для деканатов
```ecmascript 6
  class DeaneryEntity extends ShowableEntity {
    buildHtml() {
      let entityContainer = document.querySelector('#deaneryTemplate').content.firstElementChild.cloneNode(true);

      entityContainer.querySelector(`.js-pc-title`).innerText = this.title;

      return entityContainer;
    }
  }
```

Давай чуть-чуть коснемся оптимизации потому, что тут вот прямо всё вопит о том, что это можно сделать. Если посмотреть на `buildHtml()` обоих классов,
то очевидно, что отличаются они лишь селектором шаблона и собственно той частью, которая заменяет плейсхолдеры на реальный текст, да и то в этом случае
замена `title` одинакова, но это только в этом случае. Но суть одна: по-настоящему меняется только имя шаблона и функционал наполнения.

Любая цель оптимизации сократить либо количество повторяемого кода, либо уменьшить потребление ресурсов. В нашем случае мы уменьшаем количество повторяемого кода.
Так как мы уже видим, что для каждой сущности у нас есть практически одинаковый код, то тут нам очень хорошо поможет механизм наследования классов. 
Давай изменим самого верхнего предка - `ShowableEntity`

```ecmascript 6
  class ShowableEntity {
    buildHtml() {
      let entityContainer = document.querySelector('#deaneryTemplate').content.firstElementChild.cloneNode(true);

      this.buildInnerHtml(entityContainer);

      return entityContainer;
   }

   buildInnerHtml(entityContainer) {
   }

   insertHtml(parentContainer) {
      parentContainer.appendChild(this.buildHtml());
   }
  }
```

То есть в `buildHtml()` мы теперь клонируем ноду в которую вставлять HTML и передаем ее в метод, который реально этим и занимается. 
В родителе там ничего, конечно, не делается. А вот в наследниках это будет выглядеть так:
```ecmascript 6
  class RoomEntity extends ShowableEntity {
    buildInnerHtml(entityContainer) {
      entityContainer.querySelector(`.js-pc-number`).innerText = this.number;
      entityContainer.querySelector(`.js-pc-title`).innerText = this.title;
      entityContainer.querySelector(`.js-pc-role`).innerText = this.role;
    }
  }

  class DeaneryEntity extends ShowableEntity {
    buildInnerHtml(entityContainer) {
      entityContainer.querySelector(`.js-pc-title`).innerText = this.title;
    }
  }
```

Но у нас осталась одна проблема - шаблоны для каждого класса сущностей у нас разные! Тут можно было бы сделать у каждого класса свойство или константу которая бы хранила
название конкретного шаблона. Например `ShowableEntity` мог бы выглядеть так:
```ecmascript 6
  class ShowableEntity {
    templateSelector='#testTemplate';

    buildHtml() {
      let entityContainer = document.querySelector(this.templateSelector).content.firstElementChild.cloneNode(true);

      this.buildInnerHtml(entityContainer);

      return entityContainer;
   }
 }
```

Ну и каждый потомок изменял бы это свойство у себя, например, в конструкторе.

Но это не совсем правильный путь. Правильный путь - через геттер. То есть через метод, который бы возвращал селектор для шаблона. Как я уже говорил, геттеры
дают нам гибкость в принятии решений, что возвращать. Например, в геттер комнат мы можем добавить логику, что если роль помещения у нас... эээ... `туалет` то
использовать другой шаблон для построения HTML туалетов :) 
```ecmascript 6
  class ShowableEntity {
    getTemplateSelector() {
      return '#testTemplate';
    }

    buildHtml() {
      let entityContainer = document.querySelector(this.getTemplateSelector()).content.firstElementChild.cloneNode(true);

      this.buildInnerHtml(entityContainer);

      return entityContainer;
   }
 }
```

Так, минуточку... А что у нас с получением `entityContainer`? Может быть и это обернуть в геттер? Это же даст нам еще большую гибкость!
```ecmascript 6
  class ShowableEntity {
    getTemplateSelector() {
      return '#testTemplate';
    }

    getEntityContainer() {
      return document.querySelector(this.getTemplateSelector()).content.firstElementChild.cloneNode(true);
    }

    buildHtml() {
      let entityContainer = this.getEntityContainer();

      this.buildInnerHtml(entityContainer);

      return entityContainer;
   }
 }
```

А теперь попробуем посмотреть на код `ShowableEntity` целиком
```ecmascript 6
  class ShowableEntity {
    getTemplateSelector() {
      return '#testTemplate';
    }

    getEntityContainer() {
      return document.querySelector(this.getTemplateSelector()).content.firstElementChild.cloneNode(true);
    }

    buildInnerHtml(entityContainer) {
    }

    buildHtml() {
      let entityContainer = this.getEntityContainer();

      this.buildInnerHtml(entityContainer);

      return entityContainer;
    }

    insertHtml(parentContainer) {
      parentContainer.appendChild(this.buildHtml());
    }
 }
```

Еще раз проиграем в голове, что у нас просходит: у каждой сущности мы вызываем `insertHtml()` которая в, свою очередь, 
вызывает `buildHtml()` и вставляет ноду с построенным контентом в переданный контейнер.

Что у нас происходит в `buildHtml()`? Там получается нода куда вставлять, вызывается реальное построение контента и возвращается эта нода. Но ведь это совершенно
лишний функционал от которого можно избавиться, переложив это всё "на плечи" `insertHtml()`!
```ecmascript 6
  class ShowableEntity {
    getTemplateSelector() {
      return '#testTemplate';
    }

    getEntityContainer() {
      return document.querySelector(this.getTemplateSelector()).content.firstElementChild.cloneNode(true);
    }

    buildInnerHtml(entityContainer) {
    }

    insertHtml(parentContainer) {
      let entityContainer = this.getEntityContainer();

      this.buildInnerHtml(entityContainer);

      parentContainer.appendChild(entityContainer);
    }
 }
```

И теперь для того, чтобы "нарисовать" контент для каждой сущности, нам надо всего два метода:
```ecmascript 6
  class RoomEntity extends ShowableEntity {
    getTemplateSelector(){
     return '#roomTemplate';
    }

    buildInnerHtml(entityContainer) {
      entityContainer.querySelector(`.js-pc-number`).innerText = this.number;
      entityContainer.querySelector(`.js-pc-title`).innerText = this.title;
      entityContainer.querySelector(`.js-pc-role`).innerText = this.role;
    }
  }
```

Или, даже, другие два метода... наша гибкость позволяет и такое...
```ecmascript 6
  class RoomEntity extends ShowableEntity {
    getEntityContainer() {
      let entityContainer=document.createElement('div');

      entityContainer.classList.add('floor__room');

      entityContainer.innerHTML=`
    <span>Ha!</span><span class="floor__room-number js-pc-number">фыв</span>
    <span class="floor__room-title js-pc-title">фыв</span>
    <span class="floor__room-role js-pc-role">asdd</span>
`
      return entityContainer;
    }

    buildInnerHtml(entityContainer) {
      entityContainer.querySelector(`.js-pc-number`).innerText = this.number;
      entityContainer.querySelector(`.js-pc-title`).innerText = this.title;
      entityContainer.querySelector(`.js-pc-role`).innerText = this.role;
    }
  }
```

Рассмотрим построение метода `buildInnerHtml()` для этажа, как самой "навороченной" пока сущности
```ecmascript 6
  class FloorEntity extends ShowableEntity {

     buildInnerHtml(entityContainer) {
      entityContainer.querySelector(`.js-pc-number`).innerText = this.number;

      if (this.entities.rooms.length) {
        let roomsPlaceholder = entityContainer.querySelector(`.js-pc-rooms`);
        this.entities.rooms.forEach(entity => {
          entity.insertHtml(roomsPlaceholder);
        });
      }

      if (this.entities.deaneries.length) {
        let deaneriesPlaceholder = entityContainer.querySelector(`.js-pc-deaneries`);
        this.entities.deaneries.forEach(entity => {
          entity.insertHtml(deaneriesPlaceholder);
        });
      }

      if (this.entities.cathedrae.length) {
        let cathedraePlaceholder = entityContainer.querySelector(`.js-pc-cathedrae`);
        this.entities.cathedrae.forEach(entity => {
          entity.insertHtml(cathedraePlaceholder);
        });
      }
    }
}
```

Здесь по аналогии с выводом на консоль мы пробегаем все существующие комнаты, деканаты и кафедры и добавляем их в соответствующие места шаблона этажа.

Дальше нам просто надо вывести список сущности и по клику обновлять информацию в контейнере:
```html
<div id="buildingList"></div>

<div id="showContainer" style="border: 4px double black"></div>
```

Здесь мы грузим наши сущности, потом для каждой из них добавляем параграф в DOM, связываем этот объект параграфа с объектом сущности и добавляем событие клика при котором получаем сущность, очищаем контейнер и
вставляем в него  
```ecmascript 6
    let entities = loadDb();

    entities.forEach(entity => {
      let clickElement = document.createElement(`p`);

      clickElement.innerText = entity.title;
      clickElement.entity = entity;

      clickElement.onclick = (event) => {
        let container = document.getElementById(`showContainer`);
        let eventElement = event.target;

        container.innerText = '';
        eventElement.entity.insertHtml(container);
      };

      document.getElementById(`buildingList`).appendChild(clickElement);
    });
``` 


см. [example4.html](example4.html)

- [предыдущая часть](readme3.md)
- [следующая часть](readme5.md)
