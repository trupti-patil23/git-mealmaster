import "./HomePage.scss";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import HomePageImage from "./../../assets/images/HomePageImage.png"

const HomePage = () => {
    return (
        <div className="homepage">
            <img src={HomePageImage} alt="HomePageImage" className="homepage__image" />

            <ToastContainer />
        </div>
    );
}

export default HomePage;