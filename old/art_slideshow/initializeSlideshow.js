console.log("This is a test, didn't you know?")

var imageDirectory = "../img/art/";
var images = [
  "bear.jpg",
  "dj.jpg",
  "trees.jpg",
  "monster_clock.jpg",
  "blanket_fort_boy.jpg",
  "dragon.jpg",
  "visual_storytelling_1.png",
  "visual_storytelling_2.png",
  "laramie.jpg",
  "cliffs.jpg",
  "bison.jpg",
  "young_me.jpg",
  "diver.jpg",
  "bill_gates.jpg",
  "singer.jpg"
]

// Get the wrapper for all of the slides in the slideshow.
var swiper_wrapper = document.getElementsByClassName('swiper-wrapper')[0];
// Add a new slide to the slideshow for every image in var images.
for (var i = 0; i < images.length; ++i) {
  swiper_wrapper.insertAdjacentHTML('beforeend', '<div class="swiper-slide"><div class="swiper-zoom-container"><img src="' + imageDirectory + images[i] + '"></div></div>');
}

var slideshow = new Swiper ('.swiper-container', {
    direction: 'vertical',
    loop: true,
    zoom:true,
    keyboard: {
      enabled: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // This adds those little dots on the bottom of the slideshow showing how many pictures there are.
    // Make sure to uncomment the swiper-pagination element in the index.html file.
    pagination: {
      el: '.swiper-pagination',
    },
  })
