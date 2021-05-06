(function () {
  window.menuModule = {
    btnToggle: document.querySelectorAll(".js-toggle-menu"),
    btnShow: document.querySelector(".js-show-menu"),
    btnClose: document.querySelector(".js-close-menu"),
    legendEl: document.querySelector(".js-legend-el"),
    listenShow() {
      this.btnToggle.forEach((btn) => {
        btn.addEventListener(`click`, (e) => {
          this.btnShow.classList.toggle("d-none");
          this.btnClose.classList.toggle("d-none");
          this.legendEl.classList.toggle("legend--showed");
        })
      })
    },
    closeLegend() {
      this.btnShow.classList.remove("d-none");
      this.legendEl.classList.remove("legend--showed");
    }
  }
})();
