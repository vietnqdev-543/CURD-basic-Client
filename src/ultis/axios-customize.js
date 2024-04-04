import axios from 'axios';
const baseUrl = import.meta.env.VITE_BACKENDURL

  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

instance.interceptors.response.use(
    (response) => {
        // Nếu có phản hồi thành công từ máy chủ
        return response;
    },
    (error) => {
        // Nếu xảy ra lỗi từ máy chủ
        if (error.response) {
            // Nếu mã trạng thái là 400
            if (error.response.status === 400) {
                // Hiển thị thông báo lỗi cho người dùng
                message.error(error.response.data.message);
            } else {
                // Hiển thị thông báo lỗi mặc định cho người dùng
                message.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        } else {
            // Hiển thị thông báo lỗi mặc định cho người dùng khi không kết nối được với máy chủ
            message.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối internet của bạn.');
        }
        return Promise.reject(error);
    }
);

  export default instance