import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Shared/Navbar";
import Banner from "../Components/Banner";
import banner from "../assets/menu/banner3.jpg";
import useMenu from "../hooks/useMenu";
import SectionTitle from "../Components/SectionTitle";
import MenuCategory from "../Components/MenuCategory";
import offers from "../assets/home/featured.jpg";
import pizzaImg from "../assets/menu/pizza-bg.jpg"
import saladbg from "../assets/menu/salad-bg.jpg"
import soupsbg from "../assets/menu/soup-bg.jpg"
const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Menu || Bistro</title>
      </Helmet>
      {/* navbar here */}
      <Navbar></Navbar>
      {/* main banner here */}
      <div className="">
        <Banner
          bannerTitle={"OUR MENU"}
          bannerImg={banner}
          bannerSubtitle={"Would you like to try a dish?"}
        ></Banner>
      </div>

      {/* offered category here */}
      <div>
        <SectionTitle subtitle={" Our Menu"} title={"Dont't Miss"}>
          
        </SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
      </div>

      {/* desert category here */}
      <div className="">
        <Banner
          bannerTitle={"DESSERTS"}
          bannerImg={offers}
          bannerSubtitle={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></Banner>
        <MenuCategory title={'dessert'} items={dessert}></MenuCategory>
      </div>

      {/* pizza category here */}
      <div>
        <Banner
          bannerTitle={"PIZZA"}
          bannerImg={pizzaImg}
          bannerSubtitle={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></Banner>
        <MenuCategory title={'pizza'} items={pizza}></MenuCategory>
      </div>

      {/* Salad category here */}
      <div>
        <Banner
          bannerTitle={"SALADS"}
          bannerImg={saladbg}
          bannerSubtitle={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></Banner>
        <MenuCategory title= {'salad'}  items={salad}></MenuCategory>
      </div>


      {/* Soups category here */}
      <div>
        <Banner
          bannerTitle={"SOUPS"}
          bannerImg={soupsbg}
          bannerSubtitle={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></Banner>
        <MenuCategory title={'soup'} items={soup}></MenuCategory>
      </div>


    </div>
  );
};

export default Menu;
