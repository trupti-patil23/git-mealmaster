import "./HomePage.scss";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const HomePage = () => {
    return (

        <div className="homepage">
           Home Page
            <ToastContainer />           
        </div>
    );
}

export default HomePage;