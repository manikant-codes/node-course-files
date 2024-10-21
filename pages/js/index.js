let currentIndex = 0;
const carouselImages = document.querySelectorAll(".carousel img");

function showNextImage() {
  carouselImages[currentIndex].style.display = "none";
  currentIndex = (currentIndex + 1) % carouselImages.length;
  carouselImages[currentIndex].style.display = "block";
}

function showPrevImage() {
  carouselImages[currentIndex].style.display = "none";
  currentIndex =
    (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  carouselImages[currentIndex].style.display = "block";
}

setInterval(showNextImage, 3000); // Change image every 3 seconds
carouselImages.forEach((img, index) => {
  img.style.display = index === 0 ? "block" : "none";
});
