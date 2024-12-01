import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Image1 from './img/mon1.jpg'; // Đảm bảo ảnh này tồn tại
import './ShowFeedBack.css';

function ShowFeedBack() {
  console.log('ShowFeedBack component rendered');
  return (
    <div className="feedback-container">
      <div className="feedback-content">
        <img className="feedback-image" src={Image1} alt="Feedback Section" />
        <h2 className="feedback-title">Feedback</h2>
        <h2 className="feedback-description">
          Điều quan trọng nhất của nhà hàng là <br />
          chất lượng khách nhận được phải tương đương với số tiền
          <br />
          <br />
          <span className="feedback-item">
            <FaCheck color="orange" /> Phục vụ tận tâm
          </span>
          <br />
          <span className="feedback-item">
            <FaCheck color="orange" /> Chất lượng thực phẩm cao cấp
          </span>
          <br />
          <span className="feedback-item">
            <FaCheck color="orange" /> Thực đơn đa dạng
          </span>
          <br />
          <span className="feedback-item">
            <FaCheck color="orange" /> Không gian sang trọng
          </span>
        </h2>
        <Link to="/feedback">
          <button className="feedback-button">FeedBack</button>
        </Link>
      </div>
    </div>
  );
}

export default ShowFeedBack;
