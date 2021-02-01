'use strict';

(function () {
  window.utilModule = {
    FLOOR_TRANSLATOR: {
      1: {
        simple: `Первый`,
        th: `Первом`
      },
      2: {
        simple: `Второй`,
        th: `Втором`
      },
      3: {
        simple: `Третий`,
        th: `Третьем`
      },
      4: {
        simple: `Четвертый`,
        th: `Четвертом`
      },
      5: {
        simple: `Пятый`,
        th: `Пятом`
      },
    },
    windowWidth: document.documentElement.clientWidth,
    getSimpleTranslate(i) {
      return this.FLOOR_TRANSLATOR[i + 1].simple;
    },
    getThTranslate(i) {
      return this.FLOOR_TRANSLATOR[i + 1].th;
    }
  }
})();
