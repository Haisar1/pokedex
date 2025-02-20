import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {Pokemon, Pokemons,Maps } from "./pages";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/pokemons/:name" element={<Pokemon />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/" element={<Pokemons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
