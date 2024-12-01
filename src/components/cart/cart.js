import React, { useState } from 'react';
import { FaHome, FaMoneyBill } from 'react-icons/fa';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Navbar from '../navbar/Navbar';

function CartPage() {
  const navigate = useNavigate();
  const { cart, totalQuantity, totalPrice, incrementQuantity, decrementQuantity, removeFromCart, toggleCheckedItem, toggleAllItems } = useCart();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentClick = () => {
    if (totalQuantity === 0) {
      alert('Vui lòng chọn sản phẩm để thanh toán.');
      return;
    }
    setShowPaymentForm(true); // Hiển thị form chọn phương thức thanh toán
  };

  const handlePaymentMethod = (method) => {
    setSelectedPayment(method);
    setShowPaymentForm(false);
    if (method === 'cash' || method === 'bank') {
      navigate('/shipping'); // Chuyển đến trang giao hàng
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <button onClick={() => navigate('/')} id="backhome">
          <FaHome size={25} />
        </button>
        <h3>Hãy Chọn những sản phẩm muốn thanh toán</h3>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={(e) => toggleAllItems(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Chọn tất cả sản phẩm
          </label>
        </div>
        <div className="cart-items">
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-image">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheckedItem(item)}
                    />
                  </div>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
                <div className="item-details">
                  <p>
                    {item.name} - Số lượng: {item.quantity}, Giá: {item.price}$
                  </p>
                  <div>
                    <button id="but-1" onClick={() => incrementQuantity(item)}>
                      +
                    </button>
                    <button id="but-2" onClick={() => removeFromCart(item)}>
                      X
                    </button>
                    <button id="but-1" onClick={() => decrementQuantity(item)}>
                      -
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {totalQuantity > 0 && (
          <div>
            <h4>
              Tổng số sản phẩm đã chọn: {totalQuantity} - Tổng giá: {totalPrice}$
            </h4>
          </div>
        )}
        <button id="thanhtoan" onClick={handlePaymentClick}>
          <div className="icon">
            <FaMoneyBill size={25} />
          </div>
          Thanh Toán
        </button>

        {showPaymentForm && (
          <div className="payment-form">
            <h4>Chọn phương thức thanh toán</h4>
            <button className="payment-button" onClick={() => handlePaymentMethod('cash')}>
              Thanh toán tiền mặt
            </button>
            <button className="payment-button" onClick={() => handlePaymentMethod('bank')}>
              Chuyển khoản ngân hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
