const container = document.getElementById('carousel');
const track = document.getElementById('track');
const originalSlides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 1. Clone slides on both ends (cloneCount = 2 covers center + peeking neighbors)
const cloneCount = Math.min(2, originalSlides.length);

for (let i = 0; i < cloneCount; i++) {
  const endClone = originalSlides[i].cloneNode(true);
  const startClone = originalSlides[originalSlides.length - 1 - i].cloneNode(true);
  endClone.classList.add('clone');
  startClone.classList.add('clone');
  track.appendChild(endClone);
  track.insertBefore(startClone, track.firstChild);
}

// Re-query all slides (including clones) and offset the starting index
const slides = Array.from(track.children);
let currentIndex = 2 + cloneCount; 
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentDiff = 0;
let isDragging = false;
let isTransitioning = false;

window.addEventListener('resize', () => updateCarousel(false));

function updateCarousel(animate = true) {
  if (slides.length === 0) return;

  track.style.transition = animate
    ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
    : 'none';

  const containerWidth = container.offsetWidth;
  const slide = slides[0];
  const slideStyle = window.getComputedStyle(slide);
  const slideWidth = slide.offsetWidth;
  const slideMarginRight = parseFloat(slideStyle.marginRight);
  const slideMarginLeft = parseFloat(slideStyle.marginLeft);
  const totalSlideWidth = slideWidth + slideMarginRight + slideMarginLeft;

  const centerOffset = (containerWidth - slideWidth) / 2 - slideMarginLeft;
  currentTranslate = -currentIndex * totalSlideWidth + centerOffset;
  prevTranslate = currentTranslate;

  track.style.transform = `translateX(${currentTranslate}px)`;

  slides.forEach((s, index) => {
    s.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex = index;
  updateCarousel(true);
}

// 2. Silently snap to the real slide once the transition into a clone finishes
track.addEventListener('transitionend', () => {
  isTransitioning = false;
  const realCount = originalSlides.length;

  if (currentIndex < cloneCount) {
    currentIndex += realCount;
    updateCarousel(false);
  } else if (currentIndex >= cloneCount + realCount) {
    currentIndex -= realCount;
    updateCarousel(false);
  }
});

prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// Touch & Drag Support
track.addEventListener('touchstart', touchStart, { passive: true });
track.addEventListener('touchend', touchEnd);
track.addEventListener('touchmove', touchMove, { passive: true });

track.addEventListener('mousedown', touchStart);
track.addEventListener('mouseup', touchEnd);
track.addEventListener('mouseleave', () => isDragging && touchEnd());
track.addEventListener('mousemove', touchMove);

function touchStart(e) {
  if (isTransitioning) return;
  isDragging = true;
  startX = getPositionX(e);
  track.style.transition = 'none';
}

function touchMove(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentDiff = currentPosition - startX;
  track.style.transform = `translateX(${prevTranslate + currentDiff}px)`;
}

function touchEnd() {
  if (!isDragging) return;
  isDragging = false;

  if (currentDiff < -50) {
    goToSlide(currentIndex + 1);
  } else if (currentDiff > 50) {
    goToSlide(currentIndex - 1);
  } else {
    updateCarousel(true);
  }
  currentDiff = 0;
}

function getPositionX(e) {
  return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
}

// Initial setup without animation
updateCarousel(false);