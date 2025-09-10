import { Link } from "react-router-dom";
import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";


const MenuCategory = ({ menuImage, title, items }) => {
    return (
        <div>
            {menuImage && <Cover
                image={menuImage}
                title={title}
                intro="WOULD YOU LIKE TO TRY A DISH?"
            ></Cover>}

            <div className='my-10 grid md:grid-cols-2 gap-10'>
                {
                    items.map(item => <MenuItem item={item} key={item._id}></MenuItem>)
                }
            </div>

            <div className="w-max mx-auto">
                <Link to={`/order/${title}`} state={title}><button className="btn border-b-2 border-b-slate-500 rounded-lg">Order Your Favorite Food</button></Link>
            </div>

        </div>
    );
};

export default MenuCategory;