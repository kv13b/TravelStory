import LOGO from "../../assets/logo.jpg";
import ProfileInfo from "./cards/ProfileInfo";

const Navbar = ({ userInfo }) => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow top-0 z-10">
      <img src={LOGO} alt="travel-story" className="h-10 w-16" />

      <ProfileInfo userInfo={userInfo} />
    </div>
  );
};

export default Navbar;
