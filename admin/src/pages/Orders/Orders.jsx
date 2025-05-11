import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [order, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", { orderId, status: event.target.value });
      if (response.data.success) {
        toast.success("Order status updated successfully!");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Server error while updating status");
      console.error(error);
    }
  };

  return (
    <div className='admin-orders'>
      <h2>All Orders</h2>
      <div className='admin-orders-list'>
        {order.map((orderItem, index) => (
          <div key={index} className='admin-order-card'>
            <div className="order-left">
              <img src={assets.parcel_icon} alt="Parcel" />
            </div>
            <div className='admin-order-details'>
              <p className='order-items'>
                <strong>Items:</strong> {orderItem.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < orderItem.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className='order-user'><strong>User:</strong> {orderItem.address.firstName} {orderItem.address.lastName}</p>
              <p><strong>Phone:</strong> {orderItem.address.phone}</p>
              <p><strong>Address:</strong> {orderItem.address.street}, {orderItem.address.city}, {orderItem.address.state}, {orderItem.address.country} - {orderItem.address.zipcode}</p>
              <p><strong>Total Items:</strong> {orderItem.items.length}</p>
              <p><strong>Amount:</strong> ₹{orderItem.amount}</p>
              <p className='order-status'>
                <strong>Status:</strong>{' '}
                <span className={`status-badge status-${orderItem.status.toLowerCase()}`}>
                  {orderItem.status}
                </span>
              </p>
              <select 
                className='order-select' 
                onChange={(event) => { statusHandler(event, orderItem._id) }} 
                value={orderItem.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
