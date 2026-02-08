import pic1 from "../assets/pic1.png"
import axios from "axios"
import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

const Topbar = () => {

  const [userImage, setUserImage] = useState("");
  const param = useParams();
  const navigate = useNavigate()
  const username = param.username;

  console.log("username from the top bar is :", username)

  useEffect(() => {
    if(!username) return;
    try{
      const response = axios.post(`http://localhost:10000/api/vi/user/details?username=${username}`);
      setUserImage(response.data?.profilePic || pic1);
    } catch (err) {
      console.log(err);
    }

  }, [username])

  return (
    <header className="bg-white shadow-sm border-b px-6 py-1 flex items-center justify-end">
      <img src={userImage ? userImage : pic1} className="rounded-full cursor-pointer" 
      onClick={() => navigate(`/${username}/profile`)}/>
    </header>
  );
};

export default Topbar;
