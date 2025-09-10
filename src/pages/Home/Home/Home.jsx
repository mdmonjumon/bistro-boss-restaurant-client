import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";


const Home = () => {
    return (
        <div>
            <title>Bistro Boss | Home</title>

            <section>
                {/* banner section */}
                <Banner></Banner>
            </section>

            <section>
                {/* category section */}
                <Category></Category>
            </section>

            <section>
                {/* Popular menu */}
                <PopularMenu></PopularMenu>
            </section>

            {/* Featured section */}
            <Featured></Featured>

            {/* testimonials section */}
            <Testimonials></Testimonials>

        </div>
    );
};

export default Home;