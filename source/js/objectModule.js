(function () {

  window.objectsModule = {
    objects: document.querySelectorAll(".js-object"),
    addEvents() {
      this.objects.forEach((object) => {
        object.addEventListener('click', () => {
          window.cardModule.show(object);
        });
      })
    }
  }
})();
