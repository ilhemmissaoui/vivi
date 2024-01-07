import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselItem = (props) => {
  const { backgroundImage, title, subtitle, sideImage } = props;

  return (
    <Carousel.Item>
      <img
        className="d-block carousel_image w-100 h-100"
        src={
          "https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg"
        }
        alt="First slide"
      />
      <Carousel.Caption className="carousel_caption">
        <div className="">
          <span className="carousel_title">{title}</span>
          <p className="carousel_subtitle">{subtitle}</p>
        </div>
        <img
          className="carousel-subImage"
          src={sideImage}
          alt="carousel_side_image"
        />
      </Carousel.Caption>
    </Carousel.Item>
  );
};
export default CarouselItem;
