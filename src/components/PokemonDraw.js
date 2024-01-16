import { useState, useEffect, useRef } from "react";
import getByID from "../api/getByID";
import getCharacteristic from "../api/getCharacteristic";
import resultAudio from "../assets/level-up.mp3";
import "./PokemonDraw.css";
import "@fontsource/vt323";
import "@fontsource/press-start-2p";

export default function PokemonDraw() {
  const [pokeName, setPokeName] = useState("");
  const [pokeImg, setPokeImg] = useState();
  const [pokeDescript, setPokeDescript] = useState("");
  const [trigger, setTrigger] = useState(1);
  const [buttonText, setButtonText] = useState("Click to find out!");
  const [isAnalyzing, setAnalyzing] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    async function getPokemon() {
      const idArr = generateIDArr(1, 1010);
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      for (let i = 0; i < idArr.length; i++) {
        let pokeData = await getByID(idArr[i]);
        setPokeImg(pokeData.sprites.front_default);
        if (i === idArr.length - 1) {
          await delay(300 + i * 100);
          let characteristic = await getCharacteristic(generateCharacterID());
          setPokeName("Name: " + pokeData.name);
          setPokeDescript("Character: " + characteristic);

          audioRef.current.play();
          setAnalyzing(false);
          setButtonText("Click to retry");
        } else {
          setButtonText("Analyzing...");
          setAnalyzing(true);
          setPokeName();
          setPokeDescript();
        }
        await delay(300);
      }
    }
    setFirstVisit(false);
    if (!firstVisit) {
      getPokemon();
    }
  }, [trigger]);

  return (
    <div className="container">
      <h1>What's your lucky Pokemon Today?</h1>
      <audio src={resultAudio} ref={audioRef} />
      <div className="pokeDataBox">
        <img className="pokeimg" width="200px" src={pokeImg} />
        <div className="pokeText">
          <p>{pokeName}</p>
          <p>{pokeDescript}</p>
        </div>
      </div>
      <button
        disabled={isAnalyzing}
        onClick={() => {
          setTrigger(trigger + 1);
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

function generateIDArr(min, max) {
  let idArr = [];
  min = Math.ceil(min);
  max = Math.floor(max);
  for (let i = 0; i < 15; i++) {
    idArr.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return idArr;
}

function generateCharacterID() {
  return Math.floor(Math.random() * (30 - 1 + 1) + 1);
}
