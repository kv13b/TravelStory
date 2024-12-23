import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logo.png";
import ProfileInfo from "./cards/ProfileInfo";

const Navbar = ({ userInfo }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow top-0 z-10">
      <img src={LOGO} alt="travel-story" className="h-10 w-16" />

      {isToken && <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />}
    </div>
  );
};

export default Navbar;
