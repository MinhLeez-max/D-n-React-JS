import React, { useEffect } from 'react';
import './index.css';
import Navbar from './components/navbar/Navbar';
import BookTable from './components/booktable/booktable';
import HeadlineCards from './components/HeadlineCards';
import Food from './components/food/Food';
import { CartProvider } from './components/cart/CartContext';
import CartPage from './components/cart/cart';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footerr from './components/footer';
import Banner from './components/banner/banner';
import SearchResultsPage from './components/food/SearchResultsPage';
import BestSale from './components/best-sale/best_sale';
import BestSalez from './components/best-sale/contact';
import Feedback from './components/feedback/feedback';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ShowFeedBack from './components/showfeedback/showfeedback';
import PaymentMethod from './components/cart/PaymentMethod';
import ShippingInfo from './components/cart/ShippingInfo';
import Chat from './components/chat/Chat'; // Import component Chat
import BlogPage from './components/BlogPage/BlogPage';

function App() {
  const location = useLocation();

  // Cập nhật tiêu đề trang
  useEffect(() => {
    const titles = {
      '/cart': 'Cart | DBCO Restaurant',
      '/food': 'Menu | DBCO Restaurant',
      '/feedback': 'Feedback | DBCO Restaurant',
      '/booktable': 'Đặt Bàn | DBCO Restaurant',
      '/login': 'Đăng nhập | DBCO Restaurant',
      '/register': 'Đăng kí | DBCO Restaurant',
      '/payment-method': 'Phương Thức Thanh Toán | DBCO Restaurant',
      '/shipping': 'Thông Tin Giao Hàng | DBCO Restaurant',
    };

    document.title = titles[location.pathname] || 'Trang Chủ | DBCO Restaurant';
  }, [location.pathname]);

  return (
    <CartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="zz">
                  <Banner />
                  <HeadlineCards />
                  <BestSalez />
                  <BestSale />
                  <ShowFeedBack />
                </div>
                <Footerr />
              </div>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/booktable" element={<BookTable />} />
          <Route path="/food" element={<Food />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/shipping" element={<ShippingInfo />} />
          <Route path="/news" element={<BlogPage />} />
          {/* Thêm route chi tiết bài viết nếu cần */}
        </Routes>
        {/* Thêm nút Chat */}
        <Chat />
      </div>
    </CartProvider>
  );
}

export default App;
