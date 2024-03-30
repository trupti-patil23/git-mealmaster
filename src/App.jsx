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
import BrowseRecipes from "./../src/components/BrowseRecipes/BrowseRecipes.jsx"
import { MealMasterApi } from "./utils/utils.jsx";
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const mealMasterApi = new MealMasterApi();
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  /**
   * Added to get UserProfile data 
   */
  async function getUserProfileData() {
    // get token from localStorage if it exists/is set
    const token = localStorage.getItem("token");

    try {
      const response = await mealMasterApi.getUserProfileData(token);
      console.log("User data  ", response.data);
      setUserData(response.data);
      setLoggedIn(true);
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

  /*
  * Logout of application, clears localStorage JWT token and set state to logged out
  */
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData({});
  };

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={loggedIn ? <HomePage /> : <SignIn setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homePage" element={loggedIn ? <HomePage /> : <SignIn setLoggedIn={setLoggedIn} />} />
        <Route path="/userProfile" element={<UserProfie />} />
        <Route path="/browseRecipes" element={<BrowseRecipes userId={userData.id} />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
