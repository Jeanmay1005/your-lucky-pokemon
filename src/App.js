import React from "react";
import "./App.css";
import PokemonDraw from "./components/PokemonDraw";
import BackgroundAudio from "./components/BackgroundAudio";
import { Background } from "./components/Background";

function App() {
  return (
    <div>
      <Background className="background" />
      <div className="background-audio">
        <BackgroundAudio />
      </div>
      <div className="center">
        <PokemonDraw />
      </div>
    </div>
  );
}

export default App;
