import { setSuggestedUser } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSuggestedUser = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/user/suggested', { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSuggestedUser(res.data.user))                    
                }
            } catch (error) {
                console.log(error);

            }
        }
        fetchSuggestedUser();
    }, [])
}
export default useGetSuggestedUser;