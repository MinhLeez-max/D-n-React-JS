import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Khởi tạo context
const CartContext = createContext();

// Trạng thái ban đầu của giỏ hàng
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Các hàm tiện ích
const calculateTotalQuantity = (cart) => {
  return cart.reduce((total, item) => total + (item.checked ? item.quantity : 0), 0);
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + (item.checked ? item.price : 0), 0);
};

// Reducer để quản lý các hành động trên giỏ hàng
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };

    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case 'TOGGLE_CHECKED_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, checked: !item.checked }
            : item
        ),
      };

    case 'TOGGLE_ALL_ITEMS':
      return {
        ...state,
        cart: state.cart.map(item => ({ ...item, checked: action.payload })),
      };

    case 'CALCULATE_CHECKED_TOTALS':
      const totalQuantity = calculateTotalQuantity(state.cart);
      const totalPrice = calculateTotalPrice(state.cart);
      return { ...state, totalQuantity, totalPrice };

    default:
      return state;
  }
};

// Component Provider
export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Lưu trữ giỏ hàng vào localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Cập nhật tổng số lượng và giá mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    dispatch({ type: 'CALCULATE_CHECKED_TOTALS' });
  }, [state.cart]);

  // Hàm xử lý thanh toán
  const handlePayment = () => {
    const checkedItems = state.cart.filter(item => item.checked);
    if (checkedItems.length === 0) {
      alert('Vui lòng chọn sản phẩm để thanh toán.');
      return;
    }
    navigate('/payment-method'); // Điều hướng đến trang phương thức thanh toán
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalQuantity: state.totalQuantity,
        totalPrice: state.totalPrice,
        addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
        incrementQuantity: (item) => dispatch({ type: 'INCREMENT_QUANTITY', payload: item }),
        decrementQuantity: (item) => dispatch({ type: 'DECREMENT_QUANTITY', payload: item }),
        removeFromCart: (item) => dispatch({ type: 'REMOVE_FROM_CART', payload: item }),
        toggleCheckedItem: (item) => dispatch({ type: 'TOGGLE_CHECKED_ITEM', payload: item }),
        toggleAllItems: (isChecked) => dispatch({ type: 'TOGGLE_ALL_ITEMS', payload: isChecked }),
        handlePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useCart = () => {
  return useContext(CartContext);
};
