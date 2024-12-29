import React, { useContext, useState, useEffect } from "react";
import "../../components/Navbar/Navbar.css";
import { assets } from "../../assets/assets";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link} from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [menu, Setmenu] = useState("home");
  const [cartAmount, setCartAmount] = useState(getTotalCartAmount());
  useEffect(() => {
    setCartAmount(getTotalCartAmount());
  }, [getTotalCartAmount]);
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            Setmenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            Setmenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            Setmenu("mobile-app");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => {
            Setmenu("contact us");
          }}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <SearchRoundedIcon />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <LocalMallRoundedIcon />
          </Link>
          {/* {getTotalCartAmount() > 0 ? <div className="dot"></div> : ""} */}
         {
          cartAmount>0?<div className="dot"></div>:""
         }
        </div>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
        >
          sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
