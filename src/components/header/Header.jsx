import { Avatar, Divider, Dropdown, Space, message } from 'antd'
import './style.scss'
import { UserOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { callLogoutUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { doLogoutAction } from '../../redux/account/acccountSlice';

const Header = () => {
  const isLogin = useSelector(state => state.account.isLogin)
  const userName = useSelector(state => state.account.user.name)
  const navigate = useNavigate()
  const dispath = useDispatch()
  const handleLogout = async() => {
    const res = await callLogoutUser()
    console.log(res)
    dispath(doLogoutAction())
    message.success('Đăng xuất thành công')
    navigate('/')

  }

  const items = [
    {
      key: '1',
      label: (
        <div>Quản lí tài khoản</div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={()=>handleLogout()}>Đăng xuất</div>
      ),
    },

  ];

  return (

    <div className="header-container">
      <div className='nav'>
        <a href="/">home</a>
        <a href="/product">Product</a>
      </div>

      <div className="nav2">
        {isLogin ?
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className="userName">
                  <div className='logo'>
                    <Avatar size="medium" icon={<UserOutlined />} />
                  </div>
                  <div className='name'>{userName}</div>
                  <DownOutlined />
                </div>
              </Space>
            </a>
          </Dropdown>

          :
          <div className='link'>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>

        }
      </div>




    </div>

  )
}

export default Header
