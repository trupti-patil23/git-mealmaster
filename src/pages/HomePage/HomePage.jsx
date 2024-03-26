import "./HomePage.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import { MealMasterApi } from "./../../utils/utils.jsx";
import { toast, ToastContainer } from 'react-toastify';

const HomePage = ({ userObject }) => {
    const mealMasterApi = new MealMasterApi();
    const [userData, setUserData] = useState({});

    async function getUserProfileData() {
        // get token from localStorage if it exists/is set
        const token = localStorage.getItem("token");
        try {
            const response = await mealMasterApi.getUserProfileData(token);
            console.log("User data  ", response.data);
            setUserData(response.data);
        } catch (error) {
            const status = error.response.status;
            const message = error.response.data.error;

            if (status === 401) {
                toast.error(`${message}`);
            }
            else {
                console.log("Error while signing in user:", error);
            }
        }
    }

    useEffect(() => {
        // Fetch user data using the token stored in local storage
        getUserProfileData();
    }, []); // Run only once on component mount

    return (
        <>HomePage
          <ToastContainer />
        </>
    );
}

export default HomePage;