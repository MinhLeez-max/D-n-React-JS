import React from 'react';
import './NewsPage.css'; // Thêm CSS cho giao diện tin tức

const articles = [
  {
    title: "25+ cách Marketing nhà hàng hiệu quả CÓ THÊM KHÁCH và tăng doanh thu",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Kinh nghiệm tổ chức Sinh Nhật cho Bé 1 tuổi an toàn và đơn giản",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "Các mẹo mở quán cafe nhỏ hiệu quả",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
  {
    title: "10 công thức món ăn dễ làm trong 30 phút",
    image: "https://via.placeholder.com/300x200",
    link: "#",
  },
];

const keywords = [
  "Kinh nghiệm mở quán",
  "Văn khấn thần tài đúng chuẩn nghi thức",
  "Quản lý nhà hàng",
  "Mẹo vặt gia đình",
  "Công thức các món ăn giải ngấy",
  "Công thức hot",
  "Thực đơn hàng ngày",
  "Món ngon mỗi ngày",
  "Kiến thức nhà hàng",
];

const NewsPage = () => {
  return (
    <div className="news-page">
      {/* Cột bài viết */}
      <div className="articles">
        <h2>Xem nhiều nhất tháng</h2>
        <div className="articles-container">
          {articles.map((article, index) => (
            <div key={index} className="article-card">
              <img src={article.image} alt={article.title} />
              <h3>{article.title}</h3>
              <a href={article.link}>Đọc thêm</a>
            </div>
          ))}
        </div>
      </div>

      {/* Cột từ khóa */}
      <div className="keywords">
        <h3>Từ khóa:</h3>
        <div className="keyword-list">
          {keywords.map((keyword, index) => (
            <button key={index} className="keyword">
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
