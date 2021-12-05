import "./messenger.css";
import Topbar from "../../components/Header/header";
import Conversation from "../../components/Conversations/Conversation.jsx";
import Message from "../../components/message/Message";
//import MatchesList from "../../components/matches/Matches";
import React,  { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from 'socket.io-client';


  function Messenger({ history }) {
    // ithink its [] not ""
    const [conversations, setConversations] = React.useState([]);
    // it was null before so i dodnt think false is right
    const [currentChat, setCurrentChat] = React.useState(null);
    //i think its [] not ""
    const [messages, setMessages] = React.useState([]);

    const [newMessage, setNewMessage] = React.useState("");
    // i think its null not false
    const [arrivalMessage, setArrivalMessage] = React.useState(null);
  
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
  //const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  //const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  /*useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    //});
  }, [user]);*/

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + userInfo.id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userInfo.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userInfo.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userInfo.id
    );

    socket.current.emit("sendMessage", {
      senderId: userInfo.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userInfo} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userInfo.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Messenger;