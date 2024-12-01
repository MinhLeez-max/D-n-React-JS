import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './components/cart/CartContext'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './components/Login/AuthProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
  </CartProvider>,
    </BrowserRouter>
  </React.StrictMode>
);

