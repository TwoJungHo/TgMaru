import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/main' Component={Main}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
