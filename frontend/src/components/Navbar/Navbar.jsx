import React, { useState } from "react";
import "../../components/Navbar/Navbar.css";
import { assets } from "../../assets/assets";
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const Navbar = () => {
    const [menu,Setmenu]=useState("home")
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=>{Setmenu("home")}} className={menu==="home"?"active":""}>home</li>
        <li onClick={()=>{Setmenu("menu")}} className={menu==="menu"?"active":""}>menu</li>
        <li onClick={()=>{Setmenu("mobile-app")}} className={menu==="mobile-app"?"active":""}>mobile-app</li>
        <li onClick={()=>{Setmenu("contact us")}} className={menu==="contact us"?"active":""}>contact us</li>
      </ul>
      <div className="navbar-right">
        <SearchRoundedIcon/>
        <div className="navbar-search-icon">
            <LocalMallRoundedIcon/>
            <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
