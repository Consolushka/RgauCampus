(function () {

  window.objectsModule = {
    objects: document.querySelectorAll(".js-object"),
    addEvents() {
      this.objects.forEach((object) => {
        object.addEventListener('click', () => {
          window.cardModule.show(object);
        });
        object.addEventListener(`mouseover`,()=>{
         window.titleModule.showTitle(object);
        });
        object.addEventListener(`mouseout`,()=>{
          window.titleModule.closeTitle();
        });
      })
    }
  }
})();
