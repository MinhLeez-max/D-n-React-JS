import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icon

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State cho ẩn/hiện mật khẩu
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    // Gọi API để lấy danh sách users
    axios
      .get('https://67441759b4e2e04abea0bc8b.mockapi.io/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      login(user);
      alert('Đăng nhập thành công!');
      navigate('/');
    } else {
      alert('Sai mật khẩu hoặc tên đăng nhập');
    }
  };

  return (
    <div className="Login">
      {!isLoggedIn && (
        <>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white mt-10">
                LOGIN
              </h1>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Đăng nhập vào tài khoản của bạn
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nhập email của bạn
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@gamil"
                        required=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'} // Điều chỉnh loại input
                          name="password"
                          id="password"
                          placeholder="•••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Icon toggle ẩn/hiện */}
                        <div
                          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={handleLogin}
                    >
                      Đăng nhập
                    </button>
                    <Link to="/register">
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400 pt-4">
                        Bạn chưa có tài khoản?{' '}
                        <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                          Đăng kí
                        </span>
                      </p>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Login;
