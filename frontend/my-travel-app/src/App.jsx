import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./page/Auth/Login";
import Signup from "./page/Auth/Signup";
import Home from "./page/Auth/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
