import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";



const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get('users');
            return res.data;
        }
    })


    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${user.name} to make an Admin`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make an Admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`user/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "success!",
                                text: `${user.name} is an Admin now!`,
                                icon: "success"
                            });
                        }
                    })


            }
        });
    }



    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`delete/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="ml-5 mt-20">
            <div className="flex justify-evenly">
                <h2 className="text-2xl">All Users</h2>
                <h2 className="text-2xl">Total Users ({users.length})</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054]">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) =>
                                <tr key={user._id} className="bg-base-200">
                                    <th>{++index}</th>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                        {
                                            user.role === 'Admin' ?
                                                'Admin'
                                                :
                                                <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#D1A054] text-white"><FaUsers className="text-lg"></FaUsers></button>
                                        }
                                    </td>
                                    <td><button onClick={() => handleDeleteUser(user)} className="btn text-lg bg-red-600 text-white"> <RiDeleteBin6Line /> </button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;