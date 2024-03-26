import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import HomePage from './pages/HomePage/HomePage.jsx';

function App() {  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={ <SignUp /> } />
        <Route path="/homePage" element={ <HomePage/> } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
