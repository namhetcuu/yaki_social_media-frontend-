import { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import {Context} from "../../pages/ChatWithAI/Context";
import { motion, AnimatePresence } from "framer-motion";
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from "react-router-dom";

const ChatWithAI = () => {
    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/home');
    };
    const [showUserDetail, setShowUserDetail] = useState(false);
    const {
      onSent,
      recentPrompt,
      showResult,
      loading,
      resultData,
      setInput,
      input,
    } = useContext(Context);
  
    return (
      <div className="flex-1 min-h-screen pb-[15vh] relative">
        <div className="flex items-center justify-between text-[22px] p-5 text-gray-600">
            <WestIcon className="cursor-pointer" onClick={handleHomeClick} />
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: "Poppins" }}
            className="text-[30px] font-semibold text-gray-700 cursor-pointer"
          >
            Yakiri
          </motion.p>
          <motion.img
            src={assets.user_icon}
            alt=""
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowUserDetail((prev) => !prev)}
            className="w-10 rounded-full cursor-pointer hover:shadow"
          />
          {showUserDetail && (
            <motion.div
              className="absolute right-4 top-[60px] bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-[999] w-[200px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p><strong>Nam Dam Phuong</strong></p>
              <p>Email: namne272004@gmail.com</p>
              <button
                onClick={() => alert("You're haved sigle")}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
  
        <div className="max-w-[900px] mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="my-12 text-[56px] text-[#c4c7c5] font-medium px-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>
                    <span className="bg-gradient-to-r from-blue-500 to-red-400 bg-clip-text text-transparent">
                      Hello, Mr.Nam.
                    </span>
                  </p>
                  <p>How can I help you today?</p>
                </motion.div>
  
                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 px-5">
                  {[
                    {
                      text: "Suggest beautiful places to see on an upcoming road trip",
                      icon: assets.compass_icon,
                    },
                    {
                      text: "What is the best way to learn a new language?",
                      icon: assets.bulb_icon,
                    },
                    {
                      text: "Help me with my homework",
                      icon: assets.message_icon,
                    },
                    {
                      text: "Help me write HTML,CSS, and JS",
                      icon: assets.code_icon,
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={index}
                      className="h-[200px] p-4 bg-[#f0f4f9] rounded-lg relative cursor-pointer hover:bg-[#dfe4ea] transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSent(card.text)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-gray-600 text-[17px]">{card.text}</p>
                      <img
                        src={card.icon}
                        alt=""
                        className="w-[35px] p-1 absolute bottom-2 right-2 bg-white rounded-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className="px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="my-10 flex items-center gap-5">
                  <img src={assets.user_icon} alt="" className="w-10 rounded-full" />
                  <p>{recentPrompt}</p>
                </div>
                <motion.div
                  className="flex items-start gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <img src={assets.gemini_icon} alt="" className="w-10 rounded-full" />
                  {loading ? (
                    <div className="flex flex-col gap-2 w-full">
                      <hr className="h-5 rounded bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-[loader_3s_linear_infinite]" />
                      <hr className="h-5 rounded bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-[loader_3s_linear_infinite]" />
                      <hr className="h-5 rounded bg-gradient-to-r from-blue-300 via-white to-blue-300 animate-[loader_3s_linear_infinite]" />
                    </div>
                  ) : (
                    <motion.p
                      className="text-[17px] font-light leading-7"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
  
          <motion.div
            className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-3 px-5 rounded-full">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                value={input}
                onKeyDown={(e) => e.key === "Enter" && onSent()}
                placeholder="Enter a prompt here"
                className="flex-1 bg-transparent outline-none border-none p-2 text-lg"
              />
              <div className="flex items-center gap-4">
                <img src={assets.gallery_icon} alt="" className="w-6 cursor-pointer" />
                <img src={assets.mic_icon} alt="" className="w-6 cursor-pointer" />
                <img onClick={() => onSent()} src={assets.send_icon} alt="" className="w-6 cursor-pointer" />
              </div>
            </div>
            <p className="text-center text-[15px] font-light mt-4">
              Yakiri may display inaccurate info, including about people, so
              double-check its responses.{" "}
              <u>
                <b>Copyright by NamNam :)))</b>
              </u>
            </p>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default ChatWithAI;
