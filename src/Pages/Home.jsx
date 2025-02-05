import React from 'react';
import Slider from '../Components/Slider';
import Category from '../Components/Category';
import Banner from '../Components/Banner';
import PopularMenu from '../Components/PopularMenu';
import ChefRecomends from '../Components/ChefRecomends';
import Featured from '../Components/Featured';
import Testimonials from '../Components/Testimonials';
import bannerImg from '../assets/home/chef-service.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || Bistro</title>
            </Helmet>
            <Slider></Slider>
            <Category></Category>
            <Banner
            bannerImg={bannerImg}
            bannerTitle ={'BISTRO BOSS'}
            bannerSubtitle = {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborom deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.'}
            ></Banner>
            <PopularMenu></PopularMenu>
            <ChefRecomends></ChefRecomends>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;