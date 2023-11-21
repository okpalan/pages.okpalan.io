document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here
  const slideGallery = document.querySelector('.slides');
  const slides = slideGallery.querySelectorAll('div');
  const thumbnailContainer = document.querySelector('.thumbnails');
  const slideCount = slides.length;
  let slideWidth = slides[0].offsetWidth; // Get the width of the first slide

  const highlightThumbnail = () => {
    thumbnailContainer
      .querySelectorAll('div.highlighted')
      .forEach(el => el.classList.remove('highlighted'));
    const index = Math.floor(slideGallery.scrollLeft / slideWidth);
    thumbnailContainer
      .querySelector(`div[data-id="${index}"]`)
      .classList.add('highlighted');
  };

  const scrollToElement = el => {
    const index = parseInt(el.dataset.id, 10);
    slideGallery.scrollTo(index * slideWidth, 0);
  };

  thumbnailContainer.innerHTML += [...slides]
    .map((slide, i) => `<div data-id="${i}"></div>`)
    .join('');

  thumbnailContainer.querySelectorAll('div').forEach(el => {
    el.addEventListener('click', () => scrollToElement(el));
  });

  slideGallery.addEventListener('scroll', e => highlightThumbnail());

  highlightThumbnail();
});
