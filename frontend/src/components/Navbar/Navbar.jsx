import React, { useContext, useState, useEffect } from "react";
import "../../components/Navbar/Navbar.css";
import { assets } from "../../assets/assets";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Link, useNavigate} from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);
  const [menu, Setmenu] = useState("home");
  const [cartAmount, setCartAmount] = useState(getTotalCartAmount());
  const navigate=useNavigate();
  const logout=()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
  }
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
         {
          cartAmount>0?<div className="dot"></div>:""
         }
        </div>
        {
          !token?<button
          onClick={() => {
            setShowLogin(true);
          }}
        >
          sign in
        </button>:<div className="navbar-profile">
           <img src={assets.profile_icon} alt=""/>
           <ul className="nav-profile-dropdown">
            <li onClick={()=>{navigate('/myorders')}}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>
        </div>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
