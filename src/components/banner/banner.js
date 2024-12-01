import React, { useState, useEffect } from 'react';

const Banner = () => {
  const images = [
    "https://madamelan.vn/storage/222409-mdl-datban-web.jpg",  // Ảnh 1
    "https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-food-overlooking-the-background-banner-image_138613.jpg",  // Ảnh 2 
    "https://thietkewebchuyen.com/wp-content/uploads/thiet-ke-banner-nha-hang-am-thuc-1.jpg"   // Ảnh 3 
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);  // 3000ms = 3 giây

    return () => clearInterval(intervalId);  // Dọn dẹp interval khi component bị unmount
  }, [images.length]);

  // Hàm để chuyển đến ảnh tiếp theo
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Hàm để quay lại ảnh trước
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return ( 
    <div className='max-w-[1640px] mx-auto p-4 mt-19'>
      <div className='max-h-[500px] relative'>
        <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
            Tinh hoa<span className='text-orange-500'> ẩm thực</span>
          </h1>
          <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>
            <span className='text-orange-500'> hương vị</span> người Việt
          </h1>
        </div>

        {/* Ảnh sẽ thay đổi tự động và người dùng có thể click để thay đổi */}
        <img 
          className='w-full h-[500px] object-cover'  // Chỉnh kích thước ảnh cố định tại đây
          src={images[currentImageIndex]} 
          alt={`Slide ${currentImageIndex}`} 
        />
        
        {/* Nút để quay lại ảnh trước */}
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2"
          onClick={prevImage}
        >
          &#60;
        </button>

        {/* Nút để chuyển sang ảnh tiếp theo */}
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2"
          onClick={nextImage}
        >
          &#62;
        </button>
      </div>
    </div>
  );
}

export default Banner;
