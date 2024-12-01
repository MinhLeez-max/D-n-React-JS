import React, { useState, useEffect } from 'react';
import { MdModeEdit } from "react-icons/md";
import { useCart } from '../cart/CartContext';
import { useAuth } from '../Login/AuthProvider';
import axios from 'axios';

const Food = () => {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [isClicked, setIsClicked] = useState(true);
  const { isAdmin } = useAuth();
  const { isLoggedIn } = useAuth();
  const [activeType, setActiveType] = useState('All');
  const [activePrice, setActivePrice] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://655f02f3879575426b4459ed.mockapi.io/anh');
        const data = response.data;
        setOriginalFoods(data);
        setFoods(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
    } else {
      addToCart(item);
      alert('Thêm vào giỏ hàng thành công!');
    }
  };

  const filterType = (type) => {
    if (type === 'All') {
      setFoods(originalFoods);
    } else {
      const filteredData = originalFoods.filter((item) => item.type === type);
      setFoods(filteredData);
    }
    setActiveType(type); // Cập nhật mục lọc hiện tại
    setIsClicked(true);
    filterPrice(activePrice); // Đảm bảo lọc theo giá sau khi thay đổi loại món
  };

  const filterPrice = (price) => {
    let filteredData = [...originalFoods];

    if (activeType !== 'All') {
      filteredData = filteredData.filter((item) => item.type === activeType);
    }

    if (price === 'All') {
      setFoods(filteredData);
    } else if (price === 'LessThan10') {
      filteredData = filteredData.filter((item) => parseFloat(item.price) < 10);
      setFoods(filteredData);
    } else if (price === 'MoreThan10') {
      filteredData = filteredData.filter((item) => parseFloat(item.price) >= 10);
      setFoods(filteredData);
    }

    setActivePrice(price); // Cập nhật mục lọc giá hiện tại
    setIsClicked(true);
  };

  const handleDeleteProduct = (productId) => {
    if (isAdmin) {
      const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');

      if (confirmDelete) {
        axios.delete(`https://655f02f3879575426b4459ed.mockapi.io/anh/${productId}`)
          .then(() => {
            const updatedFoods = foods.filter(item => item.id !== productId);
            setFoods(updatedFoods);
          })
          .catch(error => console.error('Error deleting product:', error));
      }
    }
  };

  const handleCreateProduct = () => {
    if (isAdmin) {
      const name = prompt('Nhập tên sản phẩm:');
      const price = parseFloat(prompt('Nhập giá sản phẩm:'));
      const image = prompt('Nhập URL ảnh sản phẩm:');
      const type = prompt('Nhập loại sản phẩm:');

      if (name && !isNaN(price) && image && type) {
        axios.post('https://655f02f3879575426b4459ed.mockapi.io/anh', { name, price, image, type })
          .then(response => {
            const newProduct = response.data;
            setFoods([...foods, newProduct]);
          })
          .catch(error => console.error('Error creating product:', error));
      } else {
        alert('Vui lòng nhập lại thông tin.');
      }
    } else {
      alert('Bạn không có quyền thêm sản phẩm.');
    }
  };

  const handleEditProduct = (productId, existingProduct) => {
    if (isAdmin) {
      const updatedFields = { ...existingProduct };

      const newName = prompt('Nhập tên sản phẩm mới:');
      const newPrice = parseFloat(prompt('Nhập giá sản phẩm mới:'));
      const newImage = prompt('Nhập URL ảnh sản phẩm mới:');
      const newType = prompt('Nhập loại sản phẩm mới:');

      if (newName !== null && newName !== '') {
        updatedFields.name = newName;
      }

      if (!isNaN(newPrice)) {
        updatedFields.price = newPrice;
      }

      if (newImage !== null && newImage !== '') {
        updatedFields.image = newImage;
      }

      if (newType !== null && newType !== '') {
        updatedFields.type = newType;
      }

      axios.put(`https://655f02f3879575426b4459ed.mockapi.io/anh/${productId}`, updatedFields)
        .then(response => {
          const updatedProduct = response.data;
          const updatedFoods = foods.map(product => {
            if (product.id === productId) {
              return updatedProduct;
            }
            return product;
          });
          setFoods(updatedFoods);
        })
        .catch(error => console.error('Error updating product:', error));
    }
  };

  return (
    <div className='max-w-[1640px] m-auto px-4 py-20'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>MENU</h1>

      <div className='flex flex-col lg:flex-row justify-between'>
        <div>
          <p className='font-bold text-gray-700 text-2xl'>Lọc món</p>
          <div className='flex justify-between flex-wrap'>
            <button
              onClick={() => filterType('All')}
              className={`m-1 ${activeType === 'All' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              All
            </button>
            <button
              onClick={() => filterType('BBQ')}
              className={`m-1 ${activeType === 'BBQ' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              BBQ
            </button>
            <button
              onClick={() => filterType('hai san')}
              className={`m-1 ${activeType === 'hai san' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              Hải sản
            </button>
            <button
              onClick={() => filterType('lau')}
              className={`m-1 ${activeType === 'lau' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              Lẩu
            </button>
            <button
              onClick={() => filterType('nuoc')}
              className={`m-1 ${activeType === 'nuoc' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              Đồ uống
            </button>
            <button
              onClick={() => filterType('Món chay')}
              className={`m-1 ${activeType === 'Món chay' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              
              Món chay
            </button>
            <button
              onClick={() => filterType('Món khai vị')}
              className={`m-1 ${activeType === 'Món khai vị' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              
              Món khai vị
            </button>
          </div>
        </div>

        <div>
          <p className='font-bold text-gray-700 text-2xl'>Lọc giá</p>
          <div className='flex justify-between max-w-[390px] w-full'>
            <button
              onClick={() => filterPrice('All')}
              className={`m-1 ${activePrice === 'All' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              All
            </button>
            <button
              onClick={() => filterPrice('LessThan10')}
              className={`m-1 ${activePrice === 'LessThan10' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              Dưới $10
            </button>
            <button
              onClick={() => filterPrice('MoreThan10')}
              className={`m-1 ${activePrice === 'MoreThan10' ? 'bg-orange-600 text-white' : 'border-orange-600'}`}
            >
              Trên $10
            </button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {foods.map((item) => (
          <div key={item.id} className='border shadow-lg rounded-lg'>
            <img className='w-full h-[300px] object-cover rounded-t-lg' src={item.image} alt={item.name} />
            <div className='flex justify-between'>
              <p className='font-bold text-xl text-gray-600 p-4'>{item.name}</p>
              <p className='font-bold text-xl text-orange-600 p-4'>{item.price} $</p>
            </div>
            <div className='flex justify-between items-center'>
              <button
                onClick={() => handleAddToCart(item)}
                className='bg-orange-600 text-white p-2 rounded-md m-4'
              >
                Thêm vào giỏ hàng
              </button>
              {isAdmin && (
                <div className='flex'>
                  <MdModeEdit
                    onClick={() => handleEditProduct(item.id, item)}
                    className='text-orange-600 cursor-pointer mr-2'
                    size={20}
                  />
                  <button
                    onClick={() => handleDeleteProduct(item.id)}
                    className='text-red-600'
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className='text-center mt-6'>
          <button
            onClick={handleCreateProduct}
            className='bg-orange-600 text-white p-2 rounded-md'
          >
            Thêm sản phẩm mới
          </button>
        </div>
      )}
    </div>
  );
};

export default Food;
