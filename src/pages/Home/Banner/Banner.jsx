import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import HeroSlider from "../../../components/HeroSlider";
import banner1 from "../../../../src/assets/banner/banner1.png";
import banner2 from "../../../../src/assets/banner/banner2.png";
const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <HeroSlider
            heading1="Modern Medical"
            heading2="Technology"
            paragraph="Synergistically facilitate e-business users whereas web-enabled ROI. Objectively empower front-end potentialities before collaborative platforms. Appropriately formulate cross-platform partnerships without extensive "
            link="/doctor"
            linkText="Book Appoinments"
            backgroundImage={banner1}
          />
        </SwiperSlide>
        {/* Slide 1 */}
        <SwiperSlide>
          <HeroSlider
            heading1="Modern Medical"
            heading2="Technology"
            paragraph="Synergistically facilitate e-business users whereas web-enabled ROI. Objectively empower front-end potentialities before collaborative platforms. Appropriately formulate cross-platform partnerships without extensive "
            link="/doctor"
            linkText="Book Appoinments"
            backgroundImage={banner2}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
