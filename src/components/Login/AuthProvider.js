// AuthProvider.js
import React, { createContext, useContext, useState,  } from 'react';

// Tạo một Context để chứa thông tin về xác thực
const AuthContext = createContext();

// Component AuthProvider sẽ cung cấp thông tin xác thực cho toàn bộ ứng dụng
export const AuthProvider = ({ children }) => {
  // Sử dụng useState để lưu trữ thông tin xác thực
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);


  // Hàm login để xác thực người dùng 
  const login = (user) => {
    setLoggedIn(true);
    setUsername(user.username);
    setName(user.name);
    setIsAdmin(user.username.includes('@Admin'));
 
  };

  // Hàm logout để đăng xuất người dùng 
  const logout = () => {
    setLoggedIn(false);
    setUsername('');
    setName('');
    setIsAdmin(false);
    
  };

  // Trả về Provider với giá trị là thông tin xác thực để sử dụng ở mọi nơi trong ứng dụng
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username, name, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook useAuth giúp lấy thông tin xác thực từ Context
export const useAuth = () => {
  return useContext(AuthContext);
};
