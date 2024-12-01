import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booktable.css';
import { useAuth } from '../Login/AuthProvider';

function BookTable() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 1,
        specialRequests: ''
    });
    const [books, setBooks] = useState([]);
    const { isAdmin, isLoggedIn } = useAuth();

    // Lấy danh sách đặt bàn nếu là admin
    useEffect(() => {
        if (isAdmin) {
            axios.get('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable')
                .then(response => {
                    setBooks(response.data);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        }
    }, [isAdmin]);

    // Hàm xử lý khi gửi form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            window.alert("Hãy đăng nhập để đặt bàn");
            return;
        }

        // Kiểm tra xem các trường có được điền đầy đủ không
        const { name, phone, date, time, guests } = formData;
        if (!name || !phone || !date || !time || guests < 1) {
            window.alert("Vui lòng điền đầy đủ thông tin đặt bàn!");
            return;
        }

        // Gửi dữ liệu lên API
        axios.post('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable', formData)
            .then(response => {
                console.log('Đặt bàn thành công!', response.data);
                window.alert('Đặt bàn thành công!');
                setFormData({
                    name: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: 1,
                    specialRequests: ''
                });
                if (isAdmin) {
                    axios.get('https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable')
                        .then(response => {
                            setBooks(response.data);
                        })
                        .catch(error => {
                            console.error('Error fetching books:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Đặt bàn thất bại:', error);
            });
    };

    // Hàm xử lý thay đổi dữ liệu input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý xóa đặt bàn
    const handleDelete = (id) => {
        axios.delete(`https://65799af01acd268f9af97d69.mockapi.io/booktable/boooktable/${id}`)
            .then(() => {
                console.log('Deleted booking:', id);
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
            });
    };

    return (
        <div>
            <div className="book-table-container">
                <h1 className='book'>Đặt Bàn</h1>
                <form onSubmit={handleSubmit}>
                    <label>Tên:</label>
                    <input
                        className="ip"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                    <label>SDT:</label>
                    <input
                        className="ip"
                        name="phone"
                        onChange={handleChange}
                        value={formData.phone}
                        required
                    />
                    <label htmlFor="time">Giờ:</label>
                    <input
                        className="ip"
                        type="time"
                        id="time"
                        name="time"
                        onChange={handleChange}
                        value={formData.time}
                        required
                    />
                    <label htmlFor="date">Ngày:</label>
                    <input
                        className="ip"
                        type="date"
                        id="date"
                        name="date"
                        onChange={handleChange}
                        value={formData.date}
                        required
                    />
                    <label htmlFor="guests">Số Lượng Khách:</label>
                    <input
                        className="ip"
                        type="number"
                        id="guests"
                        name="guests"
                        min="1"
                        onChange={handleChange}
                        value={formData.guests}
                        required
                    />
                    <label htmlFor="specialRequests">Yêu Cầu Đặc Biệt:</label>
                    <textarea
                        className="ip"
                        id="specialRequests"
                        name="specialRequests"
                        rows="4"
                        onChange={handleChange}
                        value={formData.specialRequests}
                    ></textarea>

                    <button type="submit" className='but-sub'>Đặt Bàn</button>
                </form>
            </div>
            {isAdmin && (
                <div className='box-book'>
                    <h2>Danh sách khách đặt bàn</h2>
                    <hr />
                    <ul>
                        {books.map(book => (
                            <li key={book.id}>
                                <p>Tên: {book.name} - {book.phone}</p>
                                <p>Ngày: {book.date} - Giờ: {book.time}</p>
                                <p>Số khách: {book.guests}</p>
                                <p>Yêu cầu: {book.specialRequests}</p>
                                <button onClick={() => handleDelete(book.id)}>Xóa</button>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BookTable;
