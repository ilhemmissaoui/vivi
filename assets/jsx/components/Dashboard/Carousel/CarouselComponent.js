import React from "react";
import Carousel from "react-bootstrap/Carousel";
import image from "../../../../images/dashboard/carousel-phone.png";
import CarouselItem from "./CarouselItem";
import background from "../../../../images/background-carousel.avif";

const CarouselComponent = (props) => {
  const { backgroundImage, title, subtitle, sideImage } = props;

  return (
    <Carousel className="w-full">
      <Carousel.Item>
        <img
          className="d-block carousel_image"
          src={background}
          alt="First slide"
        />
        <Carousel.Caption className="bg-transparent flex flex-row">
          <div className="">
            <span className="text-white inline-block font-roboto font-bold text-left text-shadow-none text-2xl">
              Gérer votre projet en une seule touche
            </span>
            <p className="text-white inline-block font-roboto font-normal text-left text-shadow-none">
              Liassez Fillow gérer votre projet automatiquement avec nos
              meilleurs systèmes
            </p>
          </div>
          <img
            className="carousel-subImage"
            src={image}
            alt="carousel_side_image"
          />
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block carousel_image"
          src={background}
          alt="First slide"
        />
        <Carousel.Caption className="bg-transparent flex flex-row">
          <div className="">
            <span className="text-white inline-block font-roboto font-bold text-left text-shadow-none text-2xl">
              Gérer votre projet en une seule touche
            </span>
            <p className="text-white inline-block font-roboto font-normal text-left text-shadow-none">
              Liassez Fillow gérer votre projet automatiquement avec nos
              meilleurs systèmes
            </p>
          </div>
          <img
            className="carousel-subImage"
            src={image}
            alt="carousel_side_image"
          />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block carousel_image"
          src={background}
          alt="First slide"
        />
        <Carousel.Caption className="bg-transparent flex flex-row">
          <div className="">
            <span className="text-white inline-block font-roboto font-bold text-left text-shadow-none text-2xl">
              Gérer votre projet en une seule touche
            </span>
            <p className="text-white inline-block font-roboto font-normal text-left text-shadow-none">
              Liassez Fillow gérer votre projet automatiquement avec nos
              meilleurs systèmes
            </p>
          </div>
          <img
            className="carousel-subImage"
            src={image}
            alt="carousel_side_image"
          />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
export default CarouselComponent;
