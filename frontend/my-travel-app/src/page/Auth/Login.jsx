import { useState } from "react";
import PasswordFeild from "../../component/input/PasswordFeild";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/Helper";
import axiosinstance from "../../utils/axiosinstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!validateEmail(email)) {
      seterror("Please enter a valid email address");
      return;
    }
    if (!password) {
      seterror("Please enter the password");
      return;
    }

    seterror("");
    //Login api call
    try {
      const response = await axiosinstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accesstoken) {
        localStorage.setItem("token", response.data.accesstoken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        seterror(error.response.data.message);
      } else {
        seterror("unexpected error occured");
      }
    }
  };
  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-200 -bottom-40 right-1/2" />
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Capture Your <br /> Journeys
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4 ">
              Recored Your travel experience and memories
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold nb-7">Login</h4>
            <input
              type="text "
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={({ target }) => {
                setEmail(target.value);
              }}
            />
            <PasswordFeild
              value={password}
              onChange={({ target }) => {
                setpassword(target.value);
              }}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              LOGIN
            </button>
            <p className="text-x5 text-state-500 text-center my-4">OR</p>

            <button
              type="submit"
              className="btn-primary btn-light"
              onClick={() => navigate("/signup")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
