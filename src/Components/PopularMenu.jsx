import React, { useEffect, useState } from 'react';
import SectionTitle from './SectionTitle';
import MenuItem from '../Shared/MenuItem';
import useMenu from '../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')

    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const PopularItems = data.filter(item => item.category === 'popular');
    //         setMenu(PopularItems)
    //     })
    // },[])
    return (
        <section>
            <SectionTitle
            subtitle={'From Our Menu'}
            title={'Popular Items'}>
            </SectionTitle>

            <div className='grid md:grid-cols-2 gap-4 my-4'>
                {
                    popular.map(item => <MenuItem
                    item={item}
                    >
                    </MenuItem>)
                }
            </div>
            
        </section>
    );
};

export default PopularMenu;