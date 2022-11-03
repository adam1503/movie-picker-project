import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import MoviePicker from "./MoviePicker";
import Wheel from "./Wheel";
import { useGlobalContext } from "./context";
import Recommended from "./Recommended";
import React from "react";

function App() {
  const { showWheel } = useGlobalContext();
  return (
    <Router>
      {/* <Navbar /> */}
      {/* {showWheel && <Wheel />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
        <Route path="/movie-picker" element={<MoviePicker />} />
        <Route path="/movie-wheel" element={<Wheel />} />
        <Route path="/movie-recommendation" element={<Recommended />} />
      </Routes>
    </Router>
  );
}

export default App;
