import React from 'react';

const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="flex-shrink-0 overflow-hidden">
                <img
                    src={image}
                    style={{borderRadius: '0 200px 200px 200px '}}
                    alt={name}
                    className="w-[120px] object-cover"
                />
            </div>
            {/* Text Section */}
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <span className="text-lg font-bold text-yellow-600">${price}</span>
                </div>
                <p className="text-sm text-gray-600">{recipe}</p>
            </div>
        </div>
    );
};

export default MenuItem;
