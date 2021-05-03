import React from 'react';
import Header from './Header';
import Footer from './Footer';

let index = 1;

function plusSlides(n) {
    slideshow((index += n));
};

function slideshow(n) {
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

function Home(props) {
    return <div>
        <Header username={props.username} />
        <section className="main-body" onLoad={() => { slideshow(1) }}>
            <div className="image-carousel">
                <div className="slide">
                    <img src="https://mdbootstrap.com/img/new/slides/042.jpg" alt="first" />
                </div>

                <div className="image-carousel">
                    <div className="slide">
                        <img src="https://mdbootstrap.com/img/new/slides/041.jpg" alt="second" />
                    </div>
                </div>
                <div className="image-carousel">
                    <div className="slide">
                        <img src="https://mdbootstrap.com/img/new/slides/043.jpg" alt="third" />
                    </div>
                </div>
                <button className="prev" onClick={() => { plusSlides(-1) }}>&#10094;</button>
                <button className="next" onClick={() => { plusSlides(1) }}>&#10095;</button>
            </div>
        </section>
        <Footer />
    </div>
}

export default Home;