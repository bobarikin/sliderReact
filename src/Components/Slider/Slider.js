import classNames from "classnames";
import { useState, useEffect } from "react";
import "./Slider.css";

export function Slider() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countSlides, setCountSlides] = useState(0);
  const [isWindow, setIsWindow] = useState(true);

  useEffect(() => {
    const getImages = async () => {
      const response = await fetch("https://slider.ymatuhin.workers.dev/");
      const data = await response.json();
      const getCountSlides = data.images.length;
      setCarouselItems(data.images);
      setCountSlides(getCountSlides);
    };

    getImages();
  }, []);

  useEffect(() => {
    console.log(isWindow);
    if (isWindow) {
      const autoSlide = setInterval(() => {
        moveSlidesHandler("next");
      }, 2000);

      return () => clearInterval(autoSlide);
    }
  });

  function moveSlidesHandler(direction) {
    if (direction === "prev") {
      if (currentSlide === 0) {
        setCurrentSlide(countSlides - 1);
      } else {
        setCurrentSlide(currentSlide - 1);
      }
    } else if (direction === "next") {
      if (currentSlide === countSlides - 1) {
        setCurrentSlide((currentSlide) => currentSlide * 0);
      } else {
        setCurrentSlide((currentSlide) => currentSlide + 1);
      }
    }
  }

  window.onblur = () => {
    setIsWindow(false);
  };

  window.onfocus = () => {
    setIsWindow(true);
  };

  return (
    <div className="carousel slide">
      <div className="carousel-indicators">
        {carouselItems.map((item, index) => (
          <button
            className={index === currentSlide ? "active" : null}
            key={index}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {carouselItems.map((image, index) => (
          <div
            className={classNames(
              "carousel-item",
              index === currentSlide ? "active animate" : null
            )}
            key={index}
          >
            <img src={image} className="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() => moveSlidesHandler("prev")}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Предыдущий</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() => moveSlidesHandler("next")}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Следующий</span>
      </button>
    </div>
  );
}
