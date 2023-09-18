import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Navbars from "./Navbars";
import 'bootstrap/dist/css/bootstrap.css'
import Login from "./components/member/Login";
import Signup from "./components/member/Signup";
import MyProfile from "./components/member/MyProfile";
function App() {
  return (
    <div>
      <Navbars/>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/login" Component={Login}/>
          <Route path="/Signup" Component={Signup}/>
          <Route path="/TGmaruProfile/:userId" Component={MyProfile}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
