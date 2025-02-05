import React, { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";

const Testimonials = () => {
  const [review, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://bistro-boss-server-sepia-five.vercel.app/review")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        subtitle={"What Our Clients Say"}
        title={"TESTIMONIALS"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {review.map((item) => (
          <SwiperSlide>
            <div className="m-24 flex flex-col items-center space-y-3">
              <Rating style={{ maxWidth: 180 }} value={item.rating} readOnly />
              <p>{item.details}</p>
              <h3 className="text-2xl text-orange-400">{item.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {
            review.map(item => {
                <SwiperSlide>
                <div>
                    <p>{item.details}</p>
                    <h3 className="text-2xl text-orange-400">{item.name}</h3>
                </div>
            </SwiperSlide>
            })
          }
        </Swiper>
      </div> */}
    </section>
  );
};

export default Testimonials;
