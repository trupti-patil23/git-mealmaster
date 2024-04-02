import "./UserProfile.scss";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import UserProfileImage from "./../../assets/images/blank_profile.jpg";
import { MEALMASTER_API_URL, MealMasterApi } from "./../../utils/utils.jsx";
import { toast, ToastContainer } from 'react-toastify';

const UserProfile = ({ userData }) => {
    const mealMasterApi = new MealMasterApi();
    const [photo, setPhoto] = useState("");
    const [imageUrl, setImageUrl] = useState(UserProfileImage);

    //Added to get User Profile image name from server
    async function getUserProfileImage(userId) {
        try {
            const response = await mealMasterApi.getUserProfileImage(userId); 
            setImageUrl(`${MEALMASTER_API_URL}/images/${response.data.imageName}`);          
            setPhoto(response.data.imageName);
        } catch (error) {
            console.log("Error in getUserProfileImage", error);
        }
    }

    useEffect(() => {
        getUserProfileImage(userData.id);
    }, []); // Run only once on component mount

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    /**
     * Added to Capitalize first letter
     * @param {*} value 
     * @returns 
     */
    function capitalizeFirstLetter(value) {
        return value && (value.charAt(0).toUpperCase() + value.slice(1));
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            let imageData = {
                image: photo,
                userId: userData.id,
                imageName: photo.name
            }
            const response = await mealMasterApi.postUserProfileImage(imageData);
            toast.success(`${response.data.message}`, { autoclose: 500 });
            //Update ProfilePicture with new image URL
           // document.getElementById('profileImage').src = `${MEALMASTER_API_URL}/images/${photo.name}`;
           setImageUrl(`${MEALMASTER_API_URL}/images/${photo.name}`);
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <form className="user-profile" encType="multipart/form-data" onSubmit={handleSubmit}>

            <img className="user-profile__profile-image" id="profileImage" src={imageUrl} alt="User" />

            <div className="user-profile__container">
                <label className="user-profile__label" htmlFor="photoUpload">Upload Photo:</label>
                <div>
                    <input className="user-profile__file"
                        type="file"
                        accept="image/*" onChange={handlePhotoChange} />
                </div>
                <button className="user-profile__button">Upload</button>
            </div>
            <div>
                <div className="user-profile__profile-data">
                    <p className="user-profile__label">  Name: </p>
                    <p> {capitalizeFirstLetter(userData.firstName) + " " + capitalizeFirstLetter(userData.lastName)}</p>
                </div>

                <div className="user-profile__profile-data">
                    <p className="user-profile__label">Email: </p>
                    <p>{userData.email}</p>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
}

export default UserProfile;