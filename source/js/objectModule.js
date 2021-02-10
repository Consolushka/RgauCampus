(function () {

  window.objectsModule = {
    objects: null,
    legendTypes: document.querySelectorAll(".js-legend-type"),
    addEvents() {
      this.objects = document.querySelectorAll(".js-object");

      this.addEventsForObjects();

      this.addEventsForLegend();
    },
    addEventsForObjects() {
      this.objects.forEach((object) => {
        if (object.dataset.number !== "none") {
          this.onClick(object);
        }
        if (window.utilModule.windowWidth >= 948) {
          this.onHover(object);
        }
      });
    },
    onClick(object) {
      object.addEventListener('click', this.addOnClick);
    },
    addOnClick(evt) {
      window.cardModule.show(evt.target);
    },
    onHover(object) {
      object.addEventListener(`mouseover`, this.addOnMouseover);
      object.addEventListener(`mouseout`, this.addOnMouseout);
    },
    addOnMouseover(evt) {
      window.titleModule.showTitle(evt.target);
    },
    addOnMouseout() {
      window.titleModule.closeTitle();
    },
    addEventsForLegend() {
      this.legendTypes.forEach((type) => {
        this.onTypeClick(type);
      })
    },
    onTypeClick(type) {
      type.addEventListener(`click`, () => {
        window.legendModule.showOnlyCurrentType(type);
      });
    },
    removeEvents() {
      this.objects.forEach((object) => {
        if (object.dataset.number !== "none") {
          this.removeOnClick(object);
        }
        if (window.utilModule.windowWidth >= 948) {
          this.removeOnHover(object);
        }
      });
    },
    removeOnClick(object) {
      object.removeEventListener('click', this.addOnClick);
    },
    removeOnHover(object) {
      object.removeEventListener(`mouseover`, this.addOnMouseover);
      object.removeEventListener(`mouseout`, this.addOnMouseout);
    }
  }
})();
