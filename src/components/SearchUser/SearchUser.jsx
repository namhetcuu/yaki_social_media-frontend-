import { Avatar, Card, CardHeader } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  
  // Lấy dữ liệu từ Redux
  const { message,auth } = useSelector((store) => store);
  const currentUser = auth.user; // Người gửi
  //const searchResults = auth.searchUser || []; // Danh sách user tìm kiếm

  // Gửi API tìm kiếm user
  const handleSearchUser = (e) => {
    const value = e.target.value;
    setUsername(value);
    dispatch(searchUser(username));
  };

  // Gọi API tạo chat
  const handleClick = (receiverId) => {
    if (!currentUser || !currentUser.id) {
      console.error("Lỗi: Không tìm thấy người gửi!");
      return;
    }

    console.log("Người gửi:", currentUser.id);
    console.log("Người nhận:", receiverId);

    const chatData = {
      chatName: "Private Chat",
      chatImage: "",
      userIds: [currentUser.id, receiverId] // Truyền đúng ID của 2 user
    };

    dispatch(createChat(chatData));
    setUsername(""); // Xóa ô tìm kiếm sau khi chọn user
  };

  return (
    <div>
      <div className='py-5 relative'>
        <input 
          type="text" 
          placeholder="Tìm kiếm bạn bè"
          className="outline-none w-full px-5 py-3 bg-transparent border-[#3b4054] border rounded-full"
          onChange={handleSearchUser}
          value={username}
        />

        {/* Hiển thị danh sách user tìm kiếm */}
        {username && auth.searchUser.map((item) => 
          <Card key={item.id} className="absolute w-full z-10 top-[4.5rem] bg-white shadow-lg rounded-lg">
            <CardHeader
              onClick={() => {
                handleClick(item.id);
                setUsername(""); // Xóa ô tìm kiếm sau khi chọn user
              }}
              avatar={<Avatar src={item.avatar || "https://via.placeholder.com/50"} />}
              title={`${item.firstName} ${item.lastName}`}
              subheader={item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
