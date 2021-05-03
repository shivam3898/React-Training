var index = 1;

const plusSlides = (n) => {
    slideshow((index += n));
};

const slideshow = (n) => {
    let slide = document.getElementsByClassName("slide");
    if (n > slide.length) {
        index = 1;
    } else if (n < 1) {
        index = slide.length;
    }
    for (var i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }
    slide[index - 1].style.display = "block";
};

slideshow(1);