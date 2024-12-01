import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!username || !password || !name) {
      alert('Hãy nhập đủ các thông tin');
      return;
    }

    try {
      const checkUser = await axios.get(`https://656af8a9dac3630cf727840b.mockapi.io/login/login?username=${username}`);
      if (checkUser.data.length > 0) {
        alert('Tên người dùng đã tồn tại');
        return;
      }

      const response = await axios.post('https://656af8a9dac3630cf727840b.mockapi.io/login/login', { username, password, name });
      console.log('Registration successful:', response);
      alert('Đăng Kí thành công');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };
  

  return (
    <div className="Register">

    <section className="bg-gray-50 dark:bg-gray-900 pt-32">
      <div className=" flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
    <form class="max-w-sm mx-auto">
    <div  className="flex items-center mb-8 text-2xl font-semibold text-gray-900 dark:text-white  ">
        SIGN UP </div>
        
      <div class="mb-5">
        <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập email</label>
        <input  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
        dark:shadow-sm-light" placeholder="name@gmail" required
       value={username} onChange={(e) => setUsername(e.target.value)}>
        </input>
      </div>
      <div class="mb-5">
        <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập Tên</label>
        <input   class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
        dark:shadow-sm-light"required
       value={name} onChange={(e) => setName(e.target.value)}>
        </input>
      </div>
     
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập mật khẩu</label>
        <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
        dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="******"  required
        value={password} onChange={(e) => setPassword(e.target.value)} ></input>
      </div>
     <button
  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
  dark:focus:ring-blue-800"
  onClick={(event) => handleRegister(event)} 
>
  Đăng kí
</button>
           
            <Link to="/login" className="block text-center text-blue-600 hover:underline mt-3">Đăng nhập</Link>
    </form>
    
    
        </div>
       
        </section>
        </div>
  );
}

export default Register;
