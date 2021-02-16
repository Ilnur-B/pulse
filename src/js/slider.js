const slider = tns({
  container: ".slider__inner",
  items: 1,
  controls: false,
  nav: false,
  //   responsive: {
  //     640: {
  //       edgePadding: 20,
  //       gutter: 20,
  //       items: 1,
  //     },
  //     700: {
  //       gutter: 30,
  //     },
  //     991: {
  //       items: 1,
  //       gutter: 50,
  //     },
  //   },
});

document.querySelector(".right").addEventListener("click", function () {
  slider.goTo("next");
});
document.querySelector(".left").addEventListener("click", function () {
  slider.goTo("prev");
});
