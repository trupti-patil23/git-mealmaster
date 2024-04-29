import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import UserProfie from "./components/UserProfile/UserProfie.jsx";
import CreateMealPlan from "./../src/components/CreateMealPlan/CreateMealPlan.jsx";
import ViewMealPlan from "./../src/components/ViewMealPlan/ViewMealPlan.jsx";
import { MealMasterApi } from "./utils/utils.jsx";
import { toast, ToastContainer } from 'react-toastify';
import UserProfileImage from "./assets/images/blank_profile.jpg";

function App() {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerImageUrl, setHeaderImageUrl] = useState(UserProfileImage);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1280);

  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsDesktop(false);   
      } else {
        setIsDesktop(true);      
      }
    };

    window.addEventListener('resize', handleResize);   

    /**
   * Added to get User data using the token stored in local storage 
   */
    async function getUserProfileData() {
      const mealMasterApi = new MealMasterApi();
      // get token from localStorage if it exists/is set
      const token = localStorage.getItem("token");

      try {

        if (token) {
          const response = await mealMasterApi.getUserProfileData(token);
          setUserData(response.data);
          setLoggedIn(true);
        }

      } catch (error) {
        let status = "";
        let message = "";
        if (error.response) {
          status = error.response.status;
          message = error.response.data.error;
        }
        if (status === 401) {
          toast.error(`${message}`);
        }
        else {
          console.log("Error while signing in user:", error);
        }
      }
    }
    getUserProfileData();
  }, []); // Run only once on component mount

  /*
  * Logout of application, clears localStorage JWT token and set state to logged out
  */
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData({});
  };

  return (
    <>
      {!isDesktop
        ? (
          <div className="apps">
            For an enhanced browsing experience, we recommend utilizing the desktop layout optimized for screens with a width of 1280 pixels or larger.
          </div>
        ) 
        : (
          <BrowserRouter>
            <Header loggedIn={loggedIn} handleLogout={handleLogout} headerImageUrl={headerImageUrl} userData={userData} />
            <Routes>
              <Route path="/" element={loggedIn ? <HomePage userData={userData} /> : <SignIn setLoggedIn={setLoggedIn} setUserData={setUserData} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/homePage" element={loggedIn ? <HomePage userData={userData} /> : <SignIn setLoggedIn={setLoggedIn} setUserData={setUserData} />} />
              <Route path="/userProfile" element={<UserProfie userData={userData} setHeaderImageUrl={setHeaderImageUrl} />} />
              <Route path="/createMealPlan" element={<CreateMealPlan userId={userData.id} />} />
              <Route path="/viewMealPlan" element={<ViewMealPlan userId={userData.id} />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </BrowserRouter>
        )
      }
    </>
  );
}

export default App;
