import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import { useParams } from "react-router-dom";
import { users } from '../utils/users';

let index = 1;

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
    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
    }
    slide[index - 1].style.display = "block";
};

const Home = () => {

    const { id } = useParams();
    const user = users.find(user => user.id.toString() === id)
    console.log(id);

    return <div>{
        (localStorage.getItem("loggedIn") === "true" && localStorage.getItem("loggedInId") === id.toString()) ? (
            <div>
                <Header id={id} />
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
                <p>{user.id}</p>
                <p>{user.username}</p>
                <p>{user.firstName}</p>
                <p style={{ marginBottom: "30px" }}>{user.lastName}</p>
                <Footer /></div>
        ) : (<Login />)}
    </div >
}

export default Home;