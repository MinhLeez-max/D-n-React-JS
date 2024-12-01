import React from 'react';
import { Link } from'react-router-dom';

const HeadlineCards = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
      {/* Card */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Tưng bừng giáng sinh Sale off 20% các món nướng</p>
          <p className='px-2'>Đến ngày 26/12</p>
          <Link to="/food">
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Đặt ngay</button>
          </Link> 
        </div>
        <img
        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/noel-ngay-may-thumbnail-1.jpg'
          alt='/'
        />
      </div>
      {/* Card */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Kỷ miệm 10 năm thành lập nhà hàng Sale off 25% các món Lẩu</p>
          <p className='px-2'>Từ ngày 10/12 - 20/12</p>
          <Link to="/food">
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Đặt ngay</button>
          </Link>
        </div>
        <img
        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-background-hot-pot-green-leaf-minimalist-chinese-banner-image_183510.jpg'
          alt='/'
        />
      </div>
      {/* Card */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Tri cân khách hàng thân thiết mua 2 món tặng 1 nước.</p>
          <p className='px-2'>Đến hết ngày 30/12</p>
          <Link to="/food">
          <button className='border-white bg-white text-black mx-2 absolute bottom-4'>Đặt ngay</button>
          </Link>
        </div>
        <img
        className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://file.hstatic.net/200000665395/article/mau-content-tri-an-khach-hang_bf5a86a66842466a96d6fe15d917687a.jpg'
          alt='/'
        />
      </div>
    </div>
  );
};

export default HeadlineCards;
