import React from "react";

const Login = () => {
  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50"></div>
        <div className="">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl font-semibold mb-7">Login</h4>
            <input type="text" placeholder="Email" className="input-box">
              <button type="submit" className="btn-primary">
                LOGIN
              </button>
              <p className="">OR</p>
              <button
                type="submit"
                className=""
                onClick={() => {
                  navigate("/signup");
                }}
              >
                CREATE ACCOUNT{" "}
              </button>
            </input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
