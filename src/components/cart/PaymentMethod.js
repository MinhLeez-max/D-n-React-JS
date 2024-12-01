import React from 'react';
import { useNavigate } from 'react-router-dom';
import './paymentMethod.css';

function PaymentMethod() {
  const navigate = useNavigate();

  const handlePaymentChoice = (method) => {
    // Lưu phương thức thanh toán (nếu cần thiết, lưu vào context hoặc state)
    navigate('/shipping'); // Chuyển đến trang giao hàng
  };

  return (
    <div className="payment-method">
      <h3>Chọn phương thức thanh toán</h3>
      <button onClick={() => handlePaymentChoice('cash')}>Thanh toán tiền mặt</button>
      <button onClick={() => handlePaymentChoice('bank')}>Chuyển khoản ngân hàng</button>
    </div>
  );
}

export default PaymentMethod;
