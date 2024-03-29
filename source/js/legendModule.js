(function () {
  window.legendModule = {
    objects: document.querySelectorAll(".js-object"),
    showOnlyCurrentType(e) {
      window.legendModule.objects.forEach((object) => {
        if (object.dataset.type !== e.target.dataset.type && e.target.dataset.type !== "all") {
          object.classList.remove("js-object");
          object.classList.add("map-image__object--neutral");
          if (object.classList.contains("map-image__object--extra")) {
            object.classList.add("map-image__object--neutral-extra");
          }
        } else {
          object.classList.add("js-object");
          object.classList.remove("map-image__object--neutral");
          object.classList.remove("map-image__object--neutral-extra");
        }
      });
      window.objectsModule.removeEvents();
      window.objectsModule.addEventsForObjects();
    }
  }
})();
