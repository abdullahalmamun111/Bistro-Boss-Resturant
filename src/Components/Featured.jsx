import React from 'react';
import SectionTitle from './SectionTitle';
import img from '../assets/home/featured.jpg';

const Featured = () => {
    return (
        <section
            className="bg-cover bg-center bg-fixed rounded-md my-5 text-white"
            style={{ backgroundImage: `url(${img})` }}
        >
            {/* Section Title */}
            <div className="bg-black bg-opacity-50 py-8">
                <SectionTitle
                    subtitle={'Check it out'}
                    title={'FROM OUR MENU'}
                    customClass="text-center text-white"
                />
            </div>

            {/* Content */}
            <div className="bg-black bg-opacity-50 md:flex justify-center items-center py-12 px-16">
                {/* Image */}
                <div className="flex-shrink-0">
                    <img src={img} alt="Featured Dish" className="w-96 h-auto rounded-md shadow-lg" />
                </div>

                {/* Text Content */}
                <div className="md:ml-10 text-left mt-6 md:mt-0">
                    <p className="text-sm text-yellow-500">March 20, 2025</p>
                    <h3 className="text-2xl font-bold mt-2">WHERE CAN I GET SOME?</h3>
                    <p className="text-sm text-gray-300 mt-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat autem unde voluptatem est! Accusamus, beatae recusandae laudantium dignissimos debitis, praesentium, odio quia suscipit quae blanditiis neque? Nesciunt deserunt laudantium explicabo.
                    </p>
                    <button className="btn btn-outline mt-6 border-yellow-500
                    border-0 border-b-4 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                        Order Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Featured;
