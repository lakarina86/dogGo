import React from "react";
import { useUserContext } from "../../context/UserContext";
import puppiesSuitcase from "../../static/images/transparent.png";
import { HomeDiscoverButtons } from "../HomeDiscoverButtons/HomeDiscoverButtons";
import "./Home.css";

const Home: React.FC = () => {
  const { user } = useUserContext();
  return (
    <header id="home">
      <div className="container header__container">
        <h1> DOGGO </h1>
        <h3> Make it their holiday too </h3>
        <HomeDiscoverButtons />
        <div className="landingPhoto">
          <h3>Welcome {user?.firstName}</h3>
          <img
            src={puppiesSuitcase}
            alt="dogs in suitcase"
            className="dogPic"
          />
        </div>
      </div>
    </header>
  );
};

export { Home };
