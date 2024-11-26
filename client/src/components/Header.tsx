import { useState, useEffect, useRef } from "react";
import "../assets/preview/stylesheets/css/Homepage.css";
import "../assets/preview/stylesheets/css/Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/store/configureStore";
import logo from "../assets/preview/image/logoWeb.png";
import { WechatOutlined } from "@ant-design/icons";

const Title = () => {
  const [showSetting, setshowSetting] = useState(false);
  const [showChatList, setshowChatList] = useState(false);
  const Setting = useRef<HTMLDivElement | null>(null);
  const ChatList = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const [contacts, setContacts] = useState([]);
  const [activeChats, setActiveChats] = useState([]);

  const closeBothModals = () => {
    setshowSetting(false);
    setshowChatList(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (Setting.current && !Setting.current.contains(event.target as Node)) {
      setshowSetting(false);
    }
    if (ChatList.current && !ChatList.current.contains(event.target as Node)) {
      setshowChatList(false);
    }
  };

  const handleScroll = () => {
    closeBothModals();
  };

  useEffect(() => {
    if (showSetting || showChatList) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, showChatList, showSetting]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users");
        const filteredContacts = response.data.filter(
          (u) => u._id !== user._id
        );
        setContacts(filteredContacts);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleContactClick = (contactId: string) => {
    const chatExists = activeChats.some((chat) => chat.id === contactId);
    if (!chatExists) {
      if (activeChats.length >= 3) {
        setActiveChats((prevChats) => prevChats.slice(1));
      }
      setActiveChats((prevChats) => [...prevChats, { id: contactId }]);
    }
  };

  return (
    <div>
      <nav>
        <div className="Left">
          <a href="/homepage">
            <div className="Logo">
              <img src={logo} alt="Logo" />
            </div>
          </a>
        </div>

        <div className="Right">
          <WechatOutlined
            className="text-2xl text-white mr-2 mb-1"
            onClick={() => {
              setshowChatList(!showChatList);
              setshowSetting(false);
            }}
          />
          <img
            src={user.avatar}
            alt="User Avatar"
            onClick={() => {
              setshowSetting(!showSetting);
              setshowChatList(false);
            }}
          />
        </div>

        {showSetting && (
          <div className="setting-frame rounded-2">
            <div ref={Setting}>
              <Link to="/login" className="text-decoration-none text-dark ms-5">
                Log Out <i className="ms-1 fa-solid fa-right-from-bracket"></i>
              </Link>
            </div>
          </div>
        )}

        {showChatList && (
          <div className="chatlist-frame rounded-2" ref={ChatList}>
            <div className="third_warpper">
              <div className="contact d-flex flex-column mb-3">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="contact-item text-white Img"
                    onClick={() => handleContactClick(contact._id)}
                  >
                    <img
                      src={contact.avatar}
                      alt={`${contact.name}'s Avatar`}
                    />
                    <i className="text-white text-decoration-none">
                      {contact.name}
                    </i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Title;
