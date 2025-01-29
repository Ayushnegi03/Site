



import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import key from './key.png';
import lapi from './lapi.png';
import tv from './tv.png';
import phone from './phone.png';
import mouse from './mouse.png';
import game from './game.png';

import earphone from './earphone.png'

function CustomImageCarousel() {
  const images = [phone, game, lapi, key, tv ,mouse ,earphone];
  const swiperRef = useRef(null); 
  const [autoplay, setAutoplay] = useState(true); 

 
  useEffect(() => {
    if (autoplay && swiperRef.current) {
      const interval = setInterval(() => {
        swiperRef.current.swiper.slideNext();
      }, 2000); 
      return () => clearInterval(interval); 
    }
  }, [autoplay]);

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={20}
      slidesPerView={3}
      loop={true} 
      onMouseEnter={() => setAutoplay(false)} 
      onMouseLeave={() => setAutoplay(true)} 
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CustomImageCarousel;
