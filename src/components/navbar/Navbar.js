import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdTableBar, MdAccountCircle, MdLogin } from "react-icons/md";
import { BsFillCartFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../Login/AuthProvider';
import logo from './img/logo.jpg';

const Navbar = () => {
  const { isLoggedIn, logout, username, name } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [showCSKHModal, setShowCSKHModal] = useState(false); // Modal CSKH
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      window.alert("Hãy nhập tên món ăn");
    } else {
      navigate(`/search-results?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="container">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="logo-image" />
          <div onClick={() => navigate('/')} className="Home">Home</div>
          <div onClick={() => navigate('/food')} className="Home">Menu</div>
          <div onClick={() => navigate('/feedback')} className="Home">Feedback</div>
          <div onClick={() => setShowCSKHModal(true)} className="Home">CSKH</div> {/* Mở modal */}
          <div onClick={() => navigate('/news')} className="Home">
            Tin tức & Blog
          </div>

        </div>

        {/* Search Bar */}
        <div className="search">
          <input
            className="bg-transparent p-2 w-full text-white focus:outline-none"
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <AiOutlineSearch
            size={25}
            className="search-icon text-orange"
            onClick={handleSearchClick}
          />
        </div>

        {/* Cart and Auth buttons */}
        <Link to="/booktable">
          <button>
            <MdTableBar size={20} className="button-cart" />
            Đặt bàn
          </button>
        </Link>
        <Link to="/cart">
          <button>
            <BsFillCartFill size={20} className="button-cart" />
            Giỏ hàng
          </button>
        </Link>
        <a
      href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+%C4%90%C3%B4ng+%C3%81/@16.0320289,108.2187276,729m/data=!3m2!1e3!4b1!4m6!3m5!1s0x314218389cf02c2b:0xbdc63233587e2d88!8m2!3d16.0320289!4d108.2213025!16s%2Fg%2F120ktg5z?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="button-cart1"
    >
      Xem bản đồ
    </a>
        {isLoggedIn ? (
          <div className="user-info" onClick={() => setShowLogout(!showLogout)}>
            <MdAccountCircle size={35} className="account-icon" />
            {showLogout && (
              <div className="logout-box">
                <span className="username">@{username}</span>
                <div className="name">{name}</div>
                <div id="iconlogout" onClick={handleLogout}>Đăng xuất</div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button>
              <MdLogin size={20} className="button-cart" />
              Đăng nhập
            </button>
          </Link>
        )}
      </div>

      {/* Modal CSKH */}
      {showCSKHModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Chăm Sóc Khách Hàng</h2>
            <p>Liên hệ hotline: 0123 456 789</p>
            <p>Email: cskh@doanhnghiep.com</p>
            <button onClick={() => setShowCSKHModal(false)}>Đóng</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
