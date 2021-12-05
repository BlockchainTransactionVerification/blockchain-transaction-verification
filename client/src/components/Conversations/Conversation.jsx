import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // ****** change this ****
    // grabinnghte other person in the convo, in memebers array for each memeber find 
    // if it eaquals current users id
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}