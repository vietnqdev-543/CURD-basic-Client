import { Avatar, Dropdown, Space, message, Badge } from "antd";
import "./style.scss";
import { UserOutlined } from "@ant-design/icons";
import {
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutUser } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { doLogoutAction } from "../../redux/account/acccountSlice";
import UpdateUser from "../UpdateUser/UpdateUser";
import { useState } from "react";

const Header = () => {
  const isLogin = useSelector((state) => state.account.isLogin);
  const userName = useSelector((state) => state.account.user.name);
  const isAdmin = useSelector((state) => state.account.user.isAdmin);
  const avatar = useSelector((state) => state.account.user.avatar);
  const carts = useSelector((state) => state.order.carts);

  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleLogout = async () => {
    const res = await callLogoutUser();
    console.log(res);
    dispath(doLogoutAction());
    message.success("Đăng xuất thành công");
    navigate("/");
  };

  //update user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const items = [
    isAdmin
      ? {
          key: "1",
          label: <div onClick={() => navigate("./admin")}>Trang Admin</div>,
        }
      : null,
    {
      key: "2",
      label: <div onClick={() => showModal()}>Quản lí tài khoản</div>,
    },
    {
      key: "3",
      label: <div onClick={() => navigate('/orderManager')}>Quản lí đơn hàng</div>,
    },
    {
      key: "4",
      label: <div onClick={() => handleLogout()}>Đăng xuất</div>,
    },
  ];

  const handleNavigateCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <UpdateUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="header-container">
        <div className="header-top">
          <div className="nameBrand">HorizonHours</div>
          <div className="cart">
            <Badge showZero count={carts.length}>
              <span
                onClick={handleNavigateCart}
                style={{ fontSize: "27px", padding: "0 10px" }}
              >
                <ShoppingCartOutlined />
              </span>
            </Badge>
            {isLogin ? (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div className="userName">
                      <div className="logo">
                        <Avatar
                          src={avatar}
                          size="medium"
                          icon={<UserOutlined />}
                        />
                      </div>
                      <div className="name">{userName}</div>
                      <DownOutlined />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <div className="link">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </div>
            )}
          </div>
        </div>
        <div className="header-nav">
          <a href="/">Home</a>
          <a href="/product">Product</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
          <a href="#">About</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
