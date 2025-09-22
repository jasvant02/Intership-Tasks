import { useState } from "react";
import { jokesData } from "./jokesdata";

function App() {
  const [cJoke, setCJoke] = useState("");
  const [aJokes, setAJokes] = useState([]);
  const [sJokes, setSJokes] = useState([]);

  const generateJoke = () => {
    const shuffledJokes = [...jokesData].sort(() => Math.random() - 0.5);
    setAJokes(shuffledJokes);
    setCJoke(shuffledJokes[0].joke);

    if (aJokes.length > 0) {
      const nextJoke = aJokes[0];
      setCJoke(nextJoke.joke);

      setSJokes((prevSJoke) => [...prevSJoke, nextJoke.id]);

      const remainJokes = aJokes.slice(1);
      setAJokes(remainJokes);
    } else {
      setSJokes([]);
      console.log(sJokes);
    }
  };

  const triggerShiv = (ggg) => () => {
    console.log("GG", ggg);
  };
  return (
    <>
      <h1>Random Jokes Generator</h1>

      <button onClick={triggerShiv("first")}>111</button>
      <button onClick={triggerShiv("2nd")}>222`</button>

      <p>{cJoke}</p>
      <button onClick={generateJoke}>Generate Joke</button>

      <h2> Seen Jokes</h2>
      <ul>
        {sJokes.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
