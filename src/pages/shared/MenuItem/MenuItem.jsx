

const MenuItem = ({item}) => {
    const {name, image, price, recipe}= item;
    return (
        <div className="flex flex-col md:flex-row gap-3">
            <img className="w-[118px] h-[104px] rounded-full rounded-tl-none size-full object-cover" src={image} alt="" />
            <div>
                <h2 className="text-lg font-medium">{name} -----------</h2>
                <p className="w-11/12">{recipe}</p>
            </div>
            <p className="text-yellow-400">${price}</p>
            
        </div>
    );
};

export default MenuItem;