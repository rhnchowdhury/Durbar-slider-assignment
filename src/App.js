import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import './App.css';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const sliderData = [
  {
    title: 'Everest',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxQmWI6YYgBesQwBOXaeVihb3KlEQi4WbFJwZaOi26Gqg-vlQ0SF0uGyOpqDAxzsyTHa8&usqp=CAU',
  },
  {
    title: 'Avengers',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2-E3zo44jya5OJNMX6Veccti_ovAEwbWFw&usqp',
  },
  {
    title: 'Raya',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTItaHwYPeb2K5hugZFESayrNb6CyntEMdyOmuaJgW2kVlGU_baHXgUL77-VCO5LfM-l4Y&usqp=CAU',
  },
  {
    title: 'Morbius',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5L4bsV_bm0xZsHKWIbVsQ0cVQ7BQzBX0PxQ&usqp=CAU',
  },
  {
    title: 'The way back',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlOrpCze34mz6aESSPpHP9l_eLpUnVfs7qFX1BIVPzwX8vw3u38FxqLt2d_et-NeNQcgk&usqp=CAU',
  },
  {
    title: 'Beast',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTB04gt5_gUHkqUiwcyD1fGcpCc4dwYhSznDdQVKrnKigB8eH30NMOpKDcDhv47Y8HvA&usqp=CAU',
  },
];

const App = () => {

  // Dynamic title set
  const [titles, setTitles] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log(activeIndex)
  const swiperRef = useRef(null);
  const updateIndex = useCallback(
    () => setActiveIndex(swiperRef.current.swiper.realIndex),
    []
  );
  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      swiperInstance.on('slideChange', updateIndex)
    }
    return () => {
      if (swiperInstance) {
        swiperInstance.off('slideChange', updateIndex);
      }
    };
  }, [updateIndex]);

  // Set index into titles state
  useEffect(() => {
    setTitles(sliderData[activeIndex].title)
  }, [activeIndex]);

  return (

    <div className='container'>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 15,
          stretch: 40,
          depth: 600,
          modifier: 1.2,
        }}
        modules={[EffectCoverflow, Autoplay]}
        ref={swiperRef}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.image} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='last-div '>
        <h3 className='head-3'>Coming Soon</h3>
        <h2 className="head-2">{titles}</h2>
        <div className='last-div-2'>
          <p>2019-Movie-2h 10m</p>
          <div>
            <span className='imd'>IMDb</span>
            <span className='number'>7.4</span>
          </div>
        </div>
        <p className='lorem'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum ex velit illum quam dolor modi animi suscipit ducimus! Quo nam illum dicta omnis tenetur hic, ratione sunt enim excepturi...<span className='read'>Read More</span> </p>
        <button>Watch Now</button>
      </div>
    </div >
  );
};
export default App;