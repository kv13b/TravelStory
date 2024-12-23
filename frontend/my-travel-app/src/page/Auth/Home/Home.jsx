import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/input/Navbar";
import { useEffect, useState } from "react";
import axiosinstance from "../../../utils/axiosinstance";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allstories, setAllStories] = useState([]);
  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosinstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  //get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosinstance.get("/get-travel-story");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("an unexpected error occured" + error);
    }
  };

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();
    return () => {};
  }, []);
  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="cotainer mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            <div className="w-[320px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
