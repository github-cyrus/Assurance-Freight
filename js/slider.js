// Automatic slideshow functionality
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Add fade effect
function fadeIn(element) {
    var opacity = 0;
    element.style.opacity = opacity;
    element.style.display = "block";

    var timer = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
    }, 50);
}
