import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Manicure from "../assets/manicure.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../styles.css';


import { Autoplay, Pagination, Navigation, Parallax } from 'swiper/modules';



export default function App() {
   const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#000',

        }}
        speed={600}
        // parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundImage: `url(${Manicure})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundBlendMode: 'screen',
            opacity: '0.8',
            filter: 'grayscale(100%)',
            transition: 'opacity 0.5s ease, filter 0.5s ease',
          }}
          data-swiper-parallax="-23%"
        ></div>
       
        
        <SwiperSlide>
            <div className="title">
              ¿Buscas un cambio de look o simplemente necesitas un retoque?
            </div>          
            <div className="text" >
              <p >
                Ofrecemos servicios de corte de cabello de alta calidad 
                para hombres, mujeres y niños. Nuestro equipo de estilistas 
                profesionales está listo para ayudarte a lucir tu mejor versión. 
                <strong >
                  ¡Ven y experimenta un servicio personalizado en un ambiente acogedor y relajante!
                </strong>                
              </p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            ¿Quieres lucir unas manos impecables y elegantes?
          </div>          
          <div className="text" data-swiper-parallax="-100">
            <p>
              Nuestro servicio de manicure profesional está diseñado 
              para cuidar y embellecer tus uñas. Utilizamos productos 
              de alta calidad y técnicas avanzadas para garantizar resultados 
              duraderos. Ven y disfruta de un momento de relajación mientras te 
              consentimos con un manicure que hará que tus manos se vean y se sientan fabulosas
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <>
            <div className="title" data-swiper-parallax="-300">
              ¿Quieres lucir unos pies impecables y bien cuidados?
            </div>
          
            <div className="text" data-swiper-parallax="-100">
              <p>
              Nuestro servicio de pedicure profesional está diseñado para 
              ofrecerte una experiencia de relajación y embellecimiento. 
              Utilizamos productos de alta calidad y técnicas avanzadas para 
              garantizar que tus pies se vean y se sientan fabulosos. Ven y 
              disfruta de un momento de cuidado personal mientras te consentimos 
              con un pedicure que hará que tus pies luzcan perfectos.
              </p>
            </div>
          </>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
