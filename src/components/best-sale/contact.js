import React from 'react';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Image1 from '../best-sale/img/img1.png'; // Đảm bảo đường dẫn ảnh chính xác
import './best_sale'; // CSS riêng cho thành phần

function BestSalez() {
    return (
        <div className="best-sale-container">
            {/* Hình ảnh bên trái */}
            <div className="best-sale-image">
                <img src={Image1} alt="Restaurant" />
            </div>
            
            {/* Thông tin bên phải */}
            <div className="best-sale-info">
                <h2 className="welcom">Welcome to Sang_Minh Restaurant</h2>
                <h2 className="welcom1">
                    Món Việt - Đậm chất người Việt
                    <br />
                    <span className="text-sm">Địa chỉ: 123 - Trần Văn Sang - Đà Nẵng</span>
                    <br />
                    <span className="text-sm">Hotline: +84 123456789</span>
                    <br />
                    <span className="text-sm">Email: hihihehe@gmail.com.vn</span>
                </h2>

                {/* Icon mạng xã hội */}
                <div className="social-icons">
                    <FaFacebook style={{ marginRight: '10px' }} />
                    <FaInstagramSquare />
                </div>

                {/* Nút điều hướng */}
                <div className="button-group">
                    <Link to="/food">
                        <button className="but-best">Menu</button>
                    </Link>
                    <Link to="/booktable">
                        <button className="but-best1">Đặt bàn</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BestSalez;
