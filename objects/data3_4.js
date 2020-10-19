function getData() {
  return {
    fields: [
      {
        title: `Опытное поле №1`,
      },
      {
        title: `Опытное поле №2`,
      }
    ],
    buildings: [
      {
        title: `Ректорат`,
        address: `Лиственничная аллея 1`,
        floors: [
          {
            number: `1`,
            rooms: [
              {
                number: `101`,
                title: `Приёмная ректора`,
                role: `Приёмная`,
              },
              {
                number: `111`,
                role: `Туалет`,
              },
            ]
          },
          {
            number: `2`,
            rooms: [
              {
                number: `201`,
                title: `Основная переговорная`,
                role: `Переговорная`,
              }
            ]
          }
        ],
      },
      {
        title: `Концертный зал`,
        address: `ул. Тихая 5`,
        floors: [
          {
            number: `1`,
            rooms: [
              {
                number: `1`,
                title: `Зал`,
                role: `Зал`,
              },
              {
                number: `2ж`,
                title: `Женский туалет`,
                role: `Туалет`,
              },
              {
                number: `2м`,
                title: `Мужской туалет`,
                role: `Туалет`,
              },
            ]
          }
        ]
      },
      {
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
    ],
    ponds: [
      {
        title: `Пруд №1`,
      },
      {
        title: `Пруд №2`,
      }
    ]
  };
}
