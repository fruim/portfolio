// Mobile Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Optional: Toggle menu icon between bars and X if using a dynamic setup
    const icon = mobileMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

//About Carousell
//let slideIndex = 0;
//const slides = document.querySelectorAll('.slide');
//const dots = document.querySelectorAll('.dot');

//function showSlide(index) {
  // Handle edge cases (looping around)
  //if (index >= slides.length) { slideIndex = 0; }
  //if (index < 0) { slideIndex = slides.length - 1; }

  // Remove active class from all slides and dots
  //slides.forEach(slide => slide.classList.remove('active'));
  //dots.forEach(dot => dot.classList.remove('active'));

  // Show the current slide and highlight the corresponding dot
  //slides[slideIndex].classList.add('active');
  //dots[slideIndex].classList.add('active');
//}

// Next/Previous controls
//function moveSlide(step) {
  //slideIndex += step;
  //showSlide(slideIndex);
//}

// Indicator dot controls
//function currentSlide(index) {
  //slideIndex = index;
  //showSlide(slideIndex);
//}

// Optional: Auto-play functionality (uncomment to activate)
// setInterval(() => { moveSlide(1); }, 5000);