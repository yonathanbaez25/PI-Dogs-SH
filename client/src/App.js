import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import Detail from "./components/detail/Detail";
import Favorites from "./components/favorites/Favorites";
import Form from "./components/form/Form";
import Home from "./components/home/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
