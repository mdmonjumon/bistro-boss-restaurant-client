
import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';

const Testimonials = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('https://bistro-boss-restaurant-server-rosy-nine.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <section className='mb-20'>
            <SectionTitle
                heading="Testimonials"
                subHeading="What Our Client Say"
            ></SectionTitle>


            <Swiper navigation={true} modules={[Navigation]} className="mySwiper my-10">


                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >

                        <div className='px-20 flex flex-col items-center gap-5'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />

                            <p className='text-center'>{review.details}</p>
                            <p className='text-orange-300 text-xl'>{review.name}</p>
                        </div>

                    </SwiperSlide>)
                }

            </Swiper>





        </section>
    );
};

export default Testimonials;