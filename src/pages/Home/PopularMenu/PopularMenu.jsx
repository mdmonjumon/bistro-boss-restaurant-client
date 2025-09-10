
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    
    const {menu} = useMenu();
    const popularItems = menu.filter(item=>item.category === "popular")

    return (
        <section>
            <SectionTitle
                heading="form our menu"
                subHeading="Popular Items"
            ></SectionTitle>

            <div className='my-10 grid md:grid-cols-2 gap-10'>
                {
                    popularItems.map(item=> <MenuItem item={item} key={item._id}></MenuItem>)
                }
            </div>

        </section>
    );
};

export default PopularMenu;