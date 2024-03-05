

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';

const Banner = () => {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Swiper
                loop={true}
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                modules={[EffectFade, Navigation, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="/public/b1.jpg" alt="logo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/public/b2.jpg" alt="logo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/public/b3.jpg" alt="logo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/public/smith.jpg" alt="logo" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/public/clinic.jpg" alt="logo" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Banner