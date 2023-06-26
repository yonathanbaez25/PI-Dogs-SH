import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/landingPage/LandingPage";
import Detail from "./Components/detail/Detail";
import Favorites from "./Components/favorites/Favorites";
import Cards from "./Components/cards/Cards";
import Form from "./Components/form/Form";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Cards />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
