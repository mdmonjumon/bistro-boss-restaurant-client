import coverImage from '../../assets/menu/banner3.jpg';
import dessertImage from '../../assets/menu/dessert-bg.jpeg';
import pizzaImage from '../../assets/menu/pizza-bg.jpg';
import saladImage from '../../assets/menu/salad-bg.jpg';
import soupImage from '../../assets/menu/soup-bg.jpg';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMenu from '../../hooks/useMenu';
import Cover from '../shared/Cover/Cover';
import MenuCategory from './MenuCategory/MenuCategory';

const Menu = () => {

    const { menu } = useMenu()
    const offered = menu.filter(item => item.category === "offered");
    const desserts = menu.filter(item => item.category === "dessert");
    const pizzas = menu.filter(item => item.category === "pizza");
    const salads = menu.filter(item => item.category === "salad");
    const soups = menu.filter(item => item.category === "soup");




    return (
        <div className="space-y-10">
            <title>Bistro Boss | Menu</title>


            <Cover image={coverImage} title="Our Menu" intro="WOULD YOU LIKE TO TRY A DISH?"></Cover>

            <section className="space-y-16">

                {/* today's offer */}
                <SectionTitle subHeading="Don't miss" heading="Today's Offer"></SectionTitle>
                <MenuCategory items={offered}></MenuCategory>

                {/* Dessert */}
                <MenuCategory items={desserts} menuImage={dessertImage} title="dessert"></MenuCategory>

                {/* Pizza */}
                <MenuCategory items={pizzas} menuImage={pizzaImage} title="pizza"></MenuCategory>

                {/* Salad */}
                <MenuCategory items={salads} menuImage={saladImage} title="salad"></MenuCategory>

                {/* Soup */}
                <MenuCategory items={soups} menuImage={soupImage} title="soup"></MenuCategory>

            </section>

        </div>
    );
};

export default Menu;