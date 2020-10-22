(function () {

  window.objectsModule = {
    objects: document.querySelectorAll(".js-object"),
    addEvents() {
      this.objects.forEach((object) => {
        object.addEventListener('click', () => {
          let domEl = object.getBoundingClientRect();
          let posX,
            posY = domEl.top + domEl.height / 3 * 2;
          if (domEl.left + domEl.width > window.document.documentElement.clientWidth / 3 * 2) {
            posX = domEl.left + domEl.width - window.document.documentElement.clientWidth / 3;
          } else {
            posX = domEl.left + domEl.width;
          }
          window.cardModule.show(object.dataset.number, posX, posY);
        });
      })
    }
  }
})();
