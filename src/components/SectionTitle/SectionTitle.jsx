

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:max-w-2xs mx-auto text-center space-y-3">
            <p className="text-yellow-600">---{subHeading}---</p>
            <h2 className="text-2xl font-medium border-y uppercase py-3">{heading}</h2>
        </div>
    );
};

export default SectionTitle;