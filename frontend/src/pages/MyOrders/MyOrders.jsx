import React, { useContext, useEffect, useState } from 'react';
import '../MyOrders/MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.length > 0 ? (
          data.map((order, index) => {
            const totalAmount = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

            return (
              <div className='my-orders-order' key={index}>
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <p>
                  {order.items
                    .map(item => `${item.name} x ${item.quantity}`)
                    .join(', ')}
                </p>
                <p>₹{totalAmount}</p>
                <p>Items: {totalItems}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            );
          })
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
