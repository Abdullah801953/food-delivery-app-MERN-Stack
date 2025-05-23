import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from '../../context/StoreContext'
import "./PlaceOrder.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 90
    };
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error");
    }
  }
  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  }, [token])
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder="First name" name="firstName" onChange={onChangeHandler} value={data.firstName} />
          <input required type="text" placeholder="Last name" name="lastName" onChange={onChangeHandler} value={data.lastName} />
        </div>
        <input required type="email" placeholder="Email address" name="email" onChange={onChangeHandler} value={data.email} />
        <input required type="text" placeholder="Street" name="street" onChange={onChangeHandler} value={data.street} />
        <div className="multi-fields">
          <input required type="text" placeholder="City" name="city" onChange={onChangeHandler} value={data.city} />
          <input required type="text" placeholder="State" name="state" onChange={onChangeHandler} value={data.state} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder="Zip code" name="zipcode" onChange={onChangeHandler} value={data.zipcode} />
          <input required type="text" placeholder="Country" name="country" onChange={onChangeHandler} value={data.country} />
        </div>
        <input required type="text" placeholder="phone" name="phone" onChange={onChangeHandler} value={data.phone} />
      </div>
      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
          </div>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{`₹ ${getTotalCartAmount()}`}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>

              {
                getTotalCartAmount() === 0 ? '₹ 0' : <p>{`₹ 90`}</p>
              }
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              {
                getTotalCartAmount() === 0 ? '₹ 0' : <b>₹ {getTotalCartAmount() + 90}</b>
              }
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
