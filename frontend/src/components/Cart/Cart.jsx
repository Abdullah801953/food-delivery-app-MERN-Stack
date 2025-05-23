import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import BackspaceIcon from "@mui/icons-material/Backspace";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount,url } = useContext(StoreContext);
  const navigate=useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) =>
          cartItems[item._id] > 0 ? (
            <>
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{`₹ ${item.price}`}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p
                  className="cross"
                  onClick={() => {
                    removeFromCart(item._id);
                  }}
                >
                  <BackspaceIcon />
                </p>
              </div>
              <hr />
            </>
          ) : null
        )}
      </div>
      <div  className="cart-total-promo">
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
              getTotalCartAmount()===0?'₹ 0':<p>{`₹ 90`}</p>
            }
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            {
              getTotalCartAmount()===0?'₹ 0':<b>₹ {getTotalCartAmount()+90}</b>
            }
          </div>
        </div>
        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, Enter it here</p>
        <div className="cart-promocode-input">
          <input type="text" className="promo-code" />
          <button>Submit</button>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Cart;
