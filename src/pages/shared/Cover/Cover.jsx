import { Parallax } from 'react-parallax';


const Cover = ({ image, title, intro }) => {
    
    return (

        <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={image}
            bgImageAlt="menu bg"
            strength={-200}
        >
            <div
                className="hero min-h-[600px]"
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title} </h1>
                        <p className="mb-5">
                            {intro}
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>



    );
};

export default Cover;