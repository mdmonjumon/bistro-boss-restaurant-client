import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from '../../../assets/home/featured.jpg';
import './Featured.css'


const Featured = () => {
    return (
        <section className="my-20 featured-parallax bg-fixed">
            <div className="bg-black/70 py-14 px-24 text-white">
                <SectionTitle
                    heading="Form Our Menu"
                    subHeading="Check it out"
                >
                </SectionTitle>

                <div className="md:flex items-center gap-10 mt-10 text-white">
                    <img className="md:w-1/3 rounded" src={featuredImage} alt="" />
                    <div className="space-y-3">
                        <p className="text-lg">July 20, 2023</p>
                        <h2 className="text-xl uppercase">Where Can I Get Some?</h2>
                        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ex iure? Perferendis laboriosam fugiat reprehenderit, aut blanditiis totam quasi deserunt architecto, dolor impedit rem perspiciatis consequuntur, quae provident est modi.</p>
                        <button className="btn btn-ghost border-b-2 border-b-sky-700 uppercase rounded-lg">Order Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;