import { getInitials } from "../../../utils/Helper";

const ProfileInfo = ({ userInfo, onLogOut }) => {
  // console.log(userInfo.fullName);
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo ? userInfo.fullName : "")}
        </div>

        <div>
          <p className="text-sm font-medium">
            {userInfo ? userInfo.fullName : ""}
            {/* {JSON.stringify(userInfo)}; */}
          </p>
          <button
            className="text-sm text-slate-700 underline"
            onClick={onLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
