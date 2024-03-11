"use client";
import React, { FC } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "@/styles/slideshow.css";
import { ProductSlideshowProps } from "./ProductSlideshowProps.interface";

export const ProductMobileSlideshow: FC<ProductSlideshowProps> = ({
  images,
  title,
  className,
}) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: 500,
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        pagination
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
