
var root = document.documentElement;

const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
    ((navigator.maxTouchPoints > 0)) ||
    (navigator.msMaxTouchPoints > 0))
}

document.addEventListener("mousemove", function (event) {
  var x = event.clientX / innerWidth;
  var y = event.clientY / innerHeight;
  root.style.setProperty("--mouse-x", x);
  root.style.setProperty("--mouse-y", y);
})


document.addEventListener("touchmove", function (event) {
  if (isTouchDevice()) {
    var x = event.touches[0].clientX / innerWidth;
    var y = event.touches[0].clientY / innerHeight;
    root.style.setProperty("--mouse-x", x);
    root.style.setProperty("--mouse-y", y);
  }
})

