import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import { EffectFade, Navigation, Autoplay } from 'swiper/modules';

/**
 * Banner component displays a slideshow using Swiper library.
 * @returns {JSX.Element} Banner component
 */
const Banner = () => {
    return (
        <div className="relative">
            {/* Gradient overlay */}
            <div className="absolute w-full h-10 sm:h-52 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            {/* Swiper container */}
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
                {/* Slides */}
                <SwiperSlide>
                    <img src="./b1.jpg" alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./b2.jpg" alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./b3.jpg" alt="Slide 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./smith.jpg" alt="Slide 4" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./clinic.jpg" alt="Slide 5" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./b6.jpg" alt="Slide 6" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./b5.jpg" alt="Slide 7" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./bannar.jpg" alt="Slide 8" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Banner;
