(function () {

  window.objectsModule = {
    objects: document.querySelectorAll(".js-object"),
    addEvents() {
      this.objects.forEach((object) => {
        this.onClick(object);
        if(window.utilModule.windowWidth>=948){
          this.onHover(object);
        }
      })
    },
    onClick(object){
      object.addEventListener('click', () => {
        window.cardModule.show(object);
      });
    },
    onHover(object){
      object.addEventListener(`mouseover`,()=>{
        window.titleModule.showTitle(object);
      });
      object.addEventListener(`mouseout`,()=>{
        window.titleModule.closeTitle();
      });
    }
  }
})();
