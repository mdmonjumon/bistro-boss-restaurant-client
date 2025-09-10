import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const axiosSecure = useAxiosSecure()
    const [,refetch] = useCart()

    const { user } = useAuth();
    const navigate = useNavigate()
    const { name, image, price, recipe} = item;

    const handleAddToCart = food => {
        const cartItem = {
            menuItemId: food._id,
            email: user?.email,
            name,
            image,
            price
        }
        if (user && user?.email) {
            axiosSecure.post('carts', cartItem)
                .then(res => {

                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: `${name} added to the cart`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "Are you not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: `/order/${item.category}` } })
                }
            });
        }
    }
    return (
        <div className="card bg-[#F3F3F3] shadow-sm">
            <figure>
                <img
                    src={image}
                    alt={name}
                    className="rounded-xl size-full" />
            </figure>
            <p className="bg-slate-900 text-white absolute right-0 px-2 py-0.5 mr-5 mt-3 text-lg font-medium rounded">${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-[#E8E8E8] border-0 border-b-3 border-[#BB8506] text-[#BB8506] hover:bg-black rounded-lg">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;