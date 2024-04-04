
import { Outlet } from 'react-router-dom'
import React, { useState } from 'react';
import { Col, Menu, Row} from 'antd';
import './style.scss'
import HeaderAdmin from '../headerAdmin/HeaderAdmin';
import AdminDashboard from '../adminDashboard/AdminDashboard';
import AdminUser from '../adminUser/AdminUser'
import AdminProduct from '../adminProduct.jsx/AdminProduct';
import { MdDashboard } from "react-icons/md"
import { FaUserCircle } from 'react-icons/fa'
import { FaChevronDown } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
// const items = [
//     getItem( '1', <MailOutlined /> , <AdminDashboard /> , 'Dashboard' ),
//     getItem( '2', <AppstoreOutlined /> , <AdminUser /> , 'UserManager'),
//     getItem( '3', <AppstoreOutlined /> , <AdminProduct /> , 'UserProduct'),

// ];
const items = [
    getItem('', '1', <Link to="/admin"> <span className='nav-icon'><MdDashboard /></span> DashBoard</Link>),
  getItem('', '2', <Link to="/admin/user"> <span className='nav-icon'> <FaUserCircle /> </span>User Manager</Link>),
  getItem('', '3', <Link to="/admin/product"> <span className='nav-icon'> <FiBox /> </span>Products Manager </Link>),
  getItem('', '4', <Link to="/admin/category"> <span className='nav-icon'> <FiBox /> </span>Category Manager </Link>),
  getItem('', '5', <Link to="/admin/order"> <span className='nav-icon'> <AiOutlineShoppingCart/> </span>Orders Manager </Link>),

];

const LayoutAdmin = () => {
    const [theme, setTheme] = useState('dark');
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className='container'>
            <div className='header'>
                <HeaderAdmin />
            </div>
            <Row className='bottom'>
                <Col className='aside'>
                    <Menu
                        theme={theme}
                        onClick={onClick}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[current]}
                        mode="inline"
                        items={items}
                    />
                </Col>
                <Col className='content'>
                   <div style={{padding:'20px 30px'}}>
                    <Outlet />
                   </div>
                </Col>

            </Row>
            {/* <>
               
               
                <Menu
                    theme={theme}
                    onClick={onClick}
                    style={{
                        width: 256,
                    }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                />
            </> */}
        </div>
    )
}

export default LayoutAdmin