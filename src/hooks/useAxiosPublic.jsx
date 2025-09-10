import axios from "axios";


const axiosSecurePublic = axios.create({
    baseURL: 'https://bistro-boss-restaurant-server-rosy-nine.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosSecurePublic;
};

export default useAxiosPublic;