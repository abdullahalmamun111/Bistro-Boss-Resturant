import React from 'react';

const SectionTitle = ({title, subtitle}) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-8'>
            <p className='text-yellow-500 text-xl mb-2'>---- {subtitle} ----</p>
            <h1 className='text-4xl border-y-4 py-4 uppercase'>{title}</h1>
        </div>
    );
};

export default SectionTitle;