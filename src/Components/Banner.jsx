import React from 'react';

const Banner = ({bannerImg,bannerTitle,bannerSubtitle}) => {
    return (
        <div
            className="relative flex items-center justify-center rounded-md min-h-[550px] bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImg})` }}
        >
            <div className="bg-[#15151599] min-h-[200px] flex flex-col items-center justify-center text-white w-7/12 mx-auto bg-opacity-80 text-center px-8 py-10 rounded-md shadow-lg">
                <h1 className="text-4xl font-bold  mb-4">{bannerTitle}</h1>
                <p className="">
                    {bannerSubtitle}
                </p>
            </div>
        </div>
    );
};

export default Banner;
