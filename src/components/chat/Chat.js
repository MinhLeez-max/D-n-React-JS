import React, { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Đóng/mở hộp thoại
  const [messages, setMessages] = useState([]); // Lịch sử tin nhắn
  const [input, setInput] = useState(''); // Nội dung tin nhắn người dùng

  // Xử lý đóng/mở chat
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Thêm tin nhắn vào lịch sử
  const addMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  // Phản hồi tự động
  const handleAutoReply = (userMessage) => {
    const userText = userMessage.toLowerCase();

    let reply = 'Xin lỗi, tôi chưa hiểu yêu cầu của bạn. Vui lòng thử lại.';

    // Các trường hợp phản hồi tự động
    if (userText.includes('chào')) {
      reply = 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?';
    } else if (userText.includes('menu')) {
      reply = 'Bạn có thể xem thực đơn tại mục Menu trong trang chính.';
    } else if (userText.includes('đặt bàn')) {
      reply = 'Bạn muốn đặt bàn phải không? Hãy vào mục "Đặt Bàn" để hoàn tất.';
    } else if (userText.includes('giờ mở cửa')) {
      reply = 'Nhà hàng mở cửa từ 8:00 sáng đến 10:00 tối mỗi ngày.';
    }

    // Thêm phản hồi vào tin nhắn
    setTimeout(() => {
      addMessage('bot', reply);
    }, 1000); // Phản hồi sau 1 giây
  };

  // Gửi tin nhắn
  const handleSend = () => {
    if (input.trim() !== '') {
      // Thêm tin nhắn của người dùng
      addMessage('user', input);

      // Phản hồi tự động
      handleAutoReply(input);

      // Xóa nội dung nhập
      setInput('');
    }
  };

  return (
    <div>
      {/* Nút chat */}
      <div className="chat-button" onClick={toggleChat}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
          alt="Chat Icon"
        />
      </div>

      {/* Hộp thoại chat */}
      {isChatOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <span>Chat ngay để được tư vấn</span>
            <button className="close-chat" onClick={toggleChat}>
              X
            </button>
          </div>
          <div className="chat-content">
          <p>DBCO Rétaurant xin chào! Đây là dịch vụ hỗ trợ của chúng tôi.</p>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Gửi khi nhấn Enter
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
