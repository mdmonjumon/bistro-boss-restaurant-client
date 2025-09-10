import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";


const UpdateItem = () => {

    const { name, category, recipe, price, _id } = useLoaderData();


    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const imageData = { image: data.image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.image.url,
                category: data.category,
                price: parseFloat(data.price)
            };

            const menuRes = await axiosSecure.patch(`menu/update/${_id}`, menuItem)
           
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `update successful`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    };

    return (
        <div className="mt-10">
            <SectionTitle heading="update Item" subHeading="Update an Item"></SectionTitle>


            <div className="bg-[#F3F3F3] p-12 mt-10">
                <form onSubmit={handleSubmit(onSubmit)}
                    className="space-y-2"

                >
                    {/* recipe Name */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Recipe Name</legend>
                        <input defaultValue={name} {...register("name", { required: true })} type="text" className="input w-full" placeholder="Recipe Name" />
                    </fieldset>

                    <div className="flex items-center gap-2">
                        {/* category */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-base">Category</legend>
                            <select {...register("category", { required: true })} defaultValue={category} className="select w-full">
                                <option disabled={true}>Pick a category</option>
                                <option value="salad">Salad</option>
                                <option value='pizza'>Pizza</option>
                                <option value='soup'>Soup</option>
                                <option value='dessert'>Dessert</option>
                                <option value='drinks'>Drinks</option>
                            </select>
                        </fieldset>

                        {/* price */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-base">Price</legend>
                            <input defaultValue={price} {...register("price", { required: true })} type="text" className="input w-full" placeholder="price" />
                        </fieldset>
                    </div>

                    {/* recipe details */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-base">Recipe Details</legend>
                        <textarea defaultValue={recipe} {...register("recipe", { required: true })} className="textarea h-24 w-full" placeholder="Recipe Details"></textarea>
                    </fieldset>

                    {/* image */}
                    <input {...register("image", { required: true })} type="file" className="file-input block" />

                    <button className="btn bg-[#B27F2F]">
                        <input className="text-lg cursor-pointer" type="submit" value="Update Item" />
                    </button>
                </form>
            </div>

        </div>
    );
};

export default UpdateItem;