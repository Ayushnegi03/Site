
import React, { useEffect, useState } from 'react';
import './navbar.css'; 
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../../Redux/auth/authSlice';
import { getCart } from '../../Redux/cart/cartAPI';
import { clearCart } from '../../Redux/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Icon from "@mui/icons-material/Storefront";
import ProtectedRoutes from '../../Components/ProtectedRoute/protectedRoutes';
import eventEmitter from '../../Utils/handlingEvents';
// import { Menu, Badge, Button, Dropdown, Typography, Layout } from 'antd';

// const {Text} = Typography

const Navbars = () => {
    const naming = useSelector((state) => state.auth.user || 'Guest');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userId = useSelector((state) => state?.auth?.user?.id);
    const cartCount = useSelector((state) => state?.cart?.cartCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();  

    const fetchCartData = async () => {
        if (isAuthenticated) {
            try {
                dispatch(getCart(userId));
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        } else {
        }
    };

    useEffect(() => {  
        fetchCartData();
    }, [isAuthenticated, userId]);

    // Keep listener active to react to event emissions
    useEffect(() => {
        eventEmitter.on('IncreaseProductTocart', fetchCartData);
        return () => {
            // Cleanup the listener when the component unmounts
            eventEmitter.removeListener('IncreaseProductTocart', fetchCartData);
        };
    }, []);

    const handleSignOut = useCallback(() => {
        dispatch(LOGOUT());
        dispatch(clearCart());
      
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/signin'); // Redirect to sign-in page
    }, [dispatch, navigate]);

    return (
        <nav className="navbar">
            <div style={{ display: "flex", alignItems: "left" }}>
                <Icon style={{ fontSize: "40px", marginRight: "18px", color: "white" }} />
                <h1 style={{ color: "#fff", margin: 0, fontFamily: "Arial, Helvetica, sans-serif", fontSize: "24px", justifyContent: "center" }}>
                    E-SHOP
                </h1>
            </div>

            <ul className="nav-links" style={{ float: 'right !important' }}>
                <Link to="/">Home</Link>
                <div className='div-shopping'>
                    <Link to="/cart"> <ShoppingCartIcon /> </Link>
                    <div className='div-cart'>{isAuthenticated?cartCount:0}</div>
                </div>

                {isAuthenticated ? (
                    <>
                    <ProtectedRoutes>
                        <Link to="/profile">Profile ({naming.username})</Link>
                        </ProtectedRoutes>
                        {naming.role == '1' && <Link to="/dashboard">Dashboard</Link>}
                        <button onClick={handleSignOut}>Sign Out</button>
                    </>
                ) : (
                    <Link to="/profile">Profile (Guest)</Link>
                )}

                {!isAuthenticated && (
                    <>
                        <Link to="/signin">Sign In</Link>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbars;

/*
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../../Redux/auth/authSlice';
import { getCart } from '../../Redux/cart/cartAPI';
import { clearCart } from '../../Redux/cart/cartSlice';
import eventEmitter from '../../Utils/handlingEvents';
import { Menu, Badge, Button, Dropdown, Typography, Layout } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons';
import './navbar.css'; // Keep custom styles if necessary

const { Text } = Typography;
const { Header } = Layout;

const Navbars = () => {
  const naming = useSelector((state) => state.auth.user || 'Guest');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state?.auth?.user?.id);
  const cartCount = useSelector((state) => state?.cart?.cartCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCartData = async () => {
    if (isAuthenticated) {
      try {
        dispatch(getCart(userId));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [isAuthenticated, userId]);

  useEffect(() => {
    eventEmitter.on('IncreaseProductTocart', fetchCartData);
    return () => {
      eventEmitter.removeListener('IncreaseProductTocart', fetchCartData);
    };
  }, []);

  const handleSignOut = useCallback(() => {
    dispatch(LOGOUT());
    dispatch(clearCart());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  }, [dispatch, navigate]);

  const menuItems = isAuthenticated
    ? [
        {
          key: 'profile',
          label: <Link to="/profile">Profile ({naming.username})</Link>,
          icon: <UserOutlined />,
        },
        naming.role === '1' && {
          key: 'dashboard',
          label: <Link to="/dashboard">Dashboard</Link>,
          icon: <DashboardOutlined />,
        },
        {
          key: 'logout',
          label: (
            <Button type="text" onClick={handleSignOut} icon={<LogoutOutlined />}>
              Sign Out
            </Button>
          ),
        },
      ].filter(Boolean)
    : [
        {
          key: 'signin',
          label: <Link to="/signin">Sign In</Link>,
          icon: <UserOutlined />,
        },
      ];

  return (
    <Header className="navbar" style={{ backgroundColor: '#001529', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HomeOutlined style={{ fontSize: '28px', color: 'white', marginRight: '10px' }} />
        <Text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>E-SHOP</Text>
      </div>

      <Menu
        mode="horizontal"
        theme="dark"
        selectable={false}
        style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
          <Badge count={isAuthenticated ? cartCount : 0} style={{ top: '-10px'
  ,right: '7px' }} offset={[-7, 0]}>
            <Link to="/cart">Cart</Link>
          </Badge>
        </Menu.Item>
       

        <Dropdown overlay={<Menu items={menuItems} />} placement="bottomRight">
          <Button type="text" icon={<UserOutlined />} style={{ color: 'white' }}>
            {isAuthenticated ? naming.username : 'Guest'}
          </Button>
        </Dropdown>
      </Menu>
    </Header>
  );
};

export default Navbars;*/
