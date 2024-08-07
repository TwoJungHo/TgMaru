import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Navbars from "./Navbars";
import 'bootstrap/dist/css/bootstrap.css'
import Login from "./components/member/Login";
import Signup from "./components/member/Signup";
import MyProfile from "./components/member/MyProfile";
import FreeBoard from "./components/board/freeBoard";
import freeBoardInsert from "./components/board/freeBoardInsert";
import freeBoardDetail from "./components/board/freeBoardDetail";
import freeBoardUpdate from "./components/board/freeBoardUpdate";
import ProfileUpdate from "./components/member/ProfileUpdate";
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
          <Route path="/TGmaruProfile/update/:userId" Component={ProfileUpdate}/>
          <Route path="/freeboard" Component={FreeBoard}/>
          <Route path="/freeBoard/insertBoard" Component={freeBoardInsert}/>
          <Route path="/freeBoard/detail/:id/:author" Component={freeBoardDetail}/>
          <Route path="/freeBoard/update/:id" Component={freeBoardUpdate}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
