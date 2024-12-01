import React, { useState } from 'react';
import './cart.css'; // Tạo file CSS riêng để định dạng

function ShippingInfo() {
  const [message, setMessage] = useState(''); // Trạng thái để hiển thị thông báo

  // Xử lý khi bấm vào nút xác nhận
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn reload trang
    setMessage('Thành công! Vui lòng chờ shipper'); // Cập nhật thông báo
  };

  return (
    <div className="shipping-container">
      <div className="shipping-form">
        <h3>Thông tin giao hàng</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Họ và tên:
              <input type="text" name="name" placeholder="Nhập họ và tên" required />
            </label>
          </div>
          <br />
          <div>
            <label>
              Địa chỉ:
              <input type="text" name="address" placeholder="Nhập địa chỉ giao hàng" required />
            </label>
          </div>
          <br />
          <div>
            <label>
              Số điện thoại:
              <input type="text" name="phone" placeholder="Nhập số điện thoại" required />
            </label>
          </div>
          <br />
          <button type="submit">Xác nhận giao hàng</button>
        </form>
        <br />
        {/* Hiển thị thông báo */}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default ShippingInfo;
