import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Navbars from "./Navbars";
import 'bootstrap/dist/css/bootstrap.css'
function App() {
  return (
    <div>
      <Navbars/>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
