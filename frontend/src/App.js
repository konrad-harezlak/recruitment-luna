import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Module from './pages/Module'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/modules/:id" element={<Module />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
