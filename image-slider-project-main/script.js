let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let slides = document.querySelectorAll(".slide");
let changeSlide = 0;
let autoSlideInterval;
const slideInterval = 3000; // 3 seconds transition time

// Create navigation dots
const dotsContainer = document.querySelector('.navigation-dots');
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function updateDots(index) {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove("show"));
    changeSlide = index;
    slides[changeSlide].classList.add("show");
    updateDots(changeSlide);
}

function nextSlide() {
    changeSlide = (changeSlide + 1) % slides.length;
    goToSlide(changeSlide);
}

function prevSlide() {
    changeSlide = (changeSlide - 1 + slides.length) % slides.length;
    goToSlide(changeSlide);
}

// Auto slideshow
function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval first
    autoSlideInterval = setInterval(() => {
        nextSlide();
        updateDots(changeSlide);
    }, slideInterval);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Event listeners
nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

// Pause on hover
document.getElementById('slideContainer').addEventListener('mouseenter', stopAutoSlide);
document.getElementById('slideContainer').addEventListener('mouseleave', startAutoSlide);

// Ensure slideshow starts when page loads
document.addEventListener('DOMContentLoaded', startAutoSlide);