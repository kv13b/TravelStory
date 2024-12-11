function Login() {
  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
          <div>
            <h4 className="">
              Capture Your <br /> Journeys
            </h4>
            <p className="">Recored Your travel experience and memories</p>
          </div>
        </div>

        <div className="">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl font-semibold nb-7">Login</h4>
            <input type="text " placeholder="Email" className="inout-box" />
            <button type="submit" className="btn-primary">
              LOGIN
            </button>
            <p className="">OR</p>

            <button
              type="submit"
              className=""
              onClick={() => Navigate("/signup")}
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
