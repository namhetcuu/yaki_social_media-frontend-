import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import Profile from './pages/Profile/Profile';
import Reels from './pages/Reels/Reels';
import CreateReelsForm from './pages/Reels/CreateReelsForm';
import MiddlePart from './components/MiddlePart/MiddlePart';
import { Outlet } from 'react-router-dom';
import Login from './pages/Authentication/login';
import Register from './pages/Authentication/register';
import ChatWithAI from './pages/ChatWithAI/ChatWithAI';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuthStatus } from './Redux/Auth/auth.action';
import ContextProvider from './pages/ChatWithAI/Context';
import Notification from './pages/Notification/notification';
import Setting from './pages/Setting/Setting';

function HomeLayout() {
  return <HomePage><Outlet /></HomePage>;
}

function App() {
  //Routes, Route: Dùng để định nghĩa các tuyến đường (routing) trong React Router.
  // useNavigate: Dùng để điều hướng giữa các trang.
  // useLocation: Lấy thông tin về đường dẫn hiện tại của trang web.
  // useDispatch, useSelector:
  // useDispatch(): Dùng để gửi action lên Redux.
  // useSelector(): Lấy dữ liệu từ Redux store.
  // useEffect: Chạy các side-effect khi component được render.
  // checkAuthStatus: Action kiểm tra trạng thái đăng nhập của người dùng.


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const { user, token } = useSelector(state => state.auth);

  
  //🔄 useEffect 1: này chạy đúng 1 lần duy nhất khi component App được render lần đầu.
  useEffect(() => {
    dispatch(checkAuthStatus()); // Gọi API kiểm tra trạng thái auth khi mở app
  }, [dispatch]);

  // useEffect 2: Khi bạn reload (F5) Trình duyệt tải lại toàn bộ app.Redux store reset về mặc định → user bị xóa.
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
  
    if (!jwt) {
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login');
      }
    } else {
      if (!user) {
        dispatch(checkAuthStatus());
        
      }
    }
  }, [user, dispatch, navigate, location.pathname]);

  return (
    <div className='w-[100vw] h-[100vh] '>
      {/* Authentication: Trang chứa đăng nhập & đăng ký.
      HomePage: Trang chủ.
      Message: Trang tin nhắn.
      Profile: Trang hồ sơ người dùng.
      Reels: Trang hiển thị video ngắn.
      CreateReelsForm: Trang tạo video ngắn.
      MiddlePart: Thành phần chính của trang chủ.
      Login, Register: Các trang đăng nhập & đăng ký. */}
      <Routes>
        <Route path='/' element={<Authentication />}>
          <Route index element={<Login />} /> 
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        
        <Route path='/message' element={<Message />} />
        
        <Route path='/chatwithai' element={
          <ContextProvider>
            <ChatWithAI />
          </ContextProvider>
          } 
          />

        {/* Home Layout chứa các route con */}
        <Route path='/home' element={<HomeLayout />}>
          <Route index element={<MiddlePart />} />
          <Route path='reels' element={<Reels />} />
          <Route path='create-reels' element={<CreateReelsForm />} />
          <Route path='notifications' element={<Notification />} />
          <Route path='profile/:id' element={<Profile />} />
          <Route path='settings' element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
