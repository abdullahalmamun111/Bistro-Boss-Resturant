import React from 'react';
import SectionTitle from './SectionTitle';
import img1 from '../assets/home/01.jpg';
import img2 from '../assets/home/02.jpg';
import img3 from '../assets/home/03.png';

const ChefRecommends = () => {
    const cards = [
        {
            id: 1,
            img: img1,
            title: "Caeser Salad",
            description: "Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.",
            buttonColor: "bg-yellow-500 hover:bg-yellow-600",
        },
        {
            id: 2,
            img: img2,
            title: "Grilled Steak",
            description: "Served with roasted vegetables and mushroom sauce.",
            buttonColor: "bg-gray-800 hover:bg-gray-900 text-white",
        },
        {
            id: 3,
            img: img3,
            title: "Fruit Platter",
            description: "Seasonal fruits served fresh and juicy.",
            buttonColor: "bg-yellow-500 hover:bg-yellow-600",
        },
    ];

    return (
        <section className="py-12">
            <SectionTitle
                subtitle={'Should Try'}
                title={'CHEF RECOMMENDS'}
            ></SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            src={card.img}
                            alt={card.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                            <p className="text-gray-600 text-sm mt-2">{card.description}</p>
                            <button
                                className={`mt-4 px-6 py-2 text-sm font-semibold rounded-full transition-colors ${card.buttonColor}`}
                            >
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ChefRecommends;
