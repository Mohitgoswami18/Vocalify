import pic1 from "../assets/pic1.png"
import axios from "axios"
import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"

const Topbar = () => {

  const [userImage, setUserImage] = useState("empty");
  const param = useParams();
  const navigate = useNavigate()
  const username = param.username;

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://vocalify-5u15.onrender.com/api/v1/user/details?username=${username}`,
        );

        console.log(response.data.user);

        setUserImage(response.data?.user?.profilePic);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [username]);

  console.log(userImage)

  return (
    <header className="bg-white shadow-sm border-b px-6 py-1 flex items-center justify-end">
      <img src={userImage !== "empty" ? userImage : pic1} className="rounded-full w-12 cursor-pointer" 
      onClick={() => navigate(`/${username}/profile`)}/>
    </header>
  );
};

export default Topbar;
