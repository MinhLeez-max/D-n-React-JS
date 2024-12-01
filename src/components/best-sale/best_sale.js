
import { useCart } from '../cart/CartContext';
import { Link} from 'react-router-dom';
import './best_sale.css'
import { useAuth } from "../Login/AuthProvider";
const BestSaleItems = () => {
    const { addToCart } = useCart();
    const { isLoggedIn } = useAuth(); // Sử dụng useAuth để kiểm tra đăng nhập
  const bestSaleItem = [
    
        {
            "name": "Bò nướng lá lốt",
            "image": "https://cdn.tgdd.vn/Files/2017/03/23/964066/cach-lam-bo-nuong-la-lot-va-nuoc-cham-thom-ngon-dung-vi-202205241656356081.jpg",
            "price": "5",
            "type": "BBQ",
            "id": "1"
          },
          {
            "name": "Gà nướng muối ớt",
            "image": "https://i-giadinh.vnecdn.net/2022/02/11/Buoc-8-8-4440-1644565411.jpg",
            "price": "10",
            "type": "BBQ",
            "id": "2"
          },
          {
            "name": "Heo rừng nướng",
            "image": "https://thinhphatfood.vn/wp-content/uploads/2021/09/heo-lai-rung-nuong-rieng-me.jpg",
            "price": "12",
            "type": "BBQ",
            "id": "3"
          },
          {
            "name": "Vịt quay Bắc Kinh",
            "image": "https://cdn.tgdd.vn/Files/2022/01/06/1409477/cach-lam-vit-quay-bac-kinh-thom-phuc-chuan-vi-nguoi-hoa-202201061633018730.jpg",
            "price": "8",
            "type": "BBQ",
            "id": "4"
          },
    
  ]

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
    } else {
      
      addToCart(item);
    }
  };
  return (
    <>
   
    <div  className='max-w-[1640px] mx-auto p-4 mt-4'>
    <h2 className='text-orange-600 font-bold text-4xl text-center'>Best Sale</h2>
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
     
      {bestSaleItem.map((item, index) => (
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
            <button onClick={() => handleAddToCart(item)}>Đặt món </button>
            <p>
              <span className='bg-orange-500 text-white p-1 rounded-full'>
                {item.price}$
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
    <Link to="/food">
    <button className='showall'>Show all  </button>
    </Link>
    </div>
    </>
  );
};

export default BestSaleItems;
