import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import axios from 'axios';

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const { addToCart } = useCart();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    const fetchData = async () => {
      try {
        if (query) {
          // gửi request HTTP Get tới API vói tham số tìm kiếm
          const response = await axios.get(`https://655f02f3879575426b4459ed.mockapi.io/anh?search=${query}`); 
          const data = response.data;

          if (data.length === 0) {
            window.alert('Không tìm thấy sản phẩm.');
          } else {
            setSearchResults(data); //nếu api trả về kq, state sear sẽ được cập nhật với dữ liệu sản phẩm tìm được
          }
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        window.alert('Error fetching search results. Please try again.');
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="kq">
      <h1>Search Results</h1>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {searchResults.map((item, index) => (
          <div
            key={index}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
          >
            <img
              src={item.image}
              alt={item.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{item.name}</p>
              <button onClick={() => addToCart(item)}>Đặt món</button>
              <p>
                <span className='bg-orange-500 text-white p-1 rounded-full'>
                  {item.price}$
                </span>
                {/* Add favorite icon if needed */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
