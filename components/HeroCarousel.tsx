"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

type Props = {};

const heroImages = [
  { imgUrl: "/hero-images/hero-1.svg", alt: "smart watch" },
  { imgUrl: "/hero-images/hero-2.svg", alt: "bag" },
  { imgUrl: "/hero-images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/hero-images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/hero-images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = (props: Props) => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={400}
            height={400}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      {/* Hand Drawn Arrow */}
      <Image
        src="/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[20%] bottom-[4%] z-0"
      />
    </div>
  );
};

export default HeroCarousel;
