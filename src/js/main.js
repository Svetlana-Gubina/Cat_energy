"use strict";
(function () {
  const BREAKPOINTS = {
    tablet: "768px",
  };

  const toggle = document.querySelector(".main-nav__toggle");
  const menu = document.querySelector(".main-nav__list");

  const handleBreackpointChange = (event) => {
    if (event.matches) {
      menu.classList.add("visually-hidden");
      toggle.classList.remove("visually-hidden");
    } else {
      menu.classList.remove("visually-hidden");
      toggle.classList.add("visually-hidden");
    }
  };

  const mediaQueryList = window.matchMedia(
    "(max-width:" + BREAKPOINTS.tablet.toString() + ""
  );
  mediaQueryList.addListener(handleBreackpointChange);
  handleBreackpointChange(mediaQueryList);

  toggle.addEventListener("click", function (evt) {
    evt.preventDefault();
    this.classList.toggle("main-nav__toggle-close");
    menu.classList.toggle("visually-hidden");
  });
})();
