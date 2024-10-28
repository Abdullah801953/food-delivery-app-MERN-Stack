import React, { useState } from 'react'
import "../Home/Home.css"
import Header from "../../components/Header/Header"
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
const Home = () => {
  const [catagories,setCatagories]=useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu catagories={catagories} setCatagories={setCatagories}/>
      <FoodDisplay catagories={catagories}/>
    </div>
  )
} 

export default Home
