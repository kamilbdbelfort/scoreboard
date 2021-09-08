import { useState } from "react";
import Player from "./Player";
import AddPlayerForm from "./AddPlayerFrom";

function compare_score(player_a, player_b) {
  return player_b.score - player_a.score;
}

function compare_name(players) {
  return players.sort(function (player_a, player_b) {
    const name_a = player_a.name;
    const name_b = player_b.name;
    if (name_a < name_b) {
      return -1;
    }
    if (name_a > name_b) {
      return 1;
    }
    return 0;
  });
}

export default function Scoreboard() {
  const [sort_by, set_sort_by] = useState("score"); // either "score" or "name"
  const change_sorting = (event) => {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  };

  const [players, set_players] = useState([
    { id: 1, name: "Kamil", score: 99 },
    { id: 2, name: "Yoggy", score: 35 },
    { id: 3, name: "Dali", score: 28 },
    { id: 4, name: "Drone", score: 66 },
    { id: 5, name: "Famous One", score: 69 },
    { id: 6, name: "Looser", score: 0 },
  ]);

  //Defining the callback function
  const incrementScore = (id) => {
    const new_players_array = players.map((player) => {
      if (player.id === id) {
        return {
          id: player.id,
          name: player.name,
          score: player.score + 1,
        };
      } else {
        return player;
      }
    });
    console.log(players.id);
    set_players(new_players_array);
  };

  const resetScore = (score) => {
    const new_players_array = players.map((player) => {
      return { id: player.id, name: player.name, score: player.score * 0 };
    });
    set_players(new_players_array);
  };

  const randomizeScore = (score) => {
    const new_players_array = players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        score: Math.floor(Math.random() * 101),
      };
    });
    set_players(new_players_array);
  };

  //const names_sorted = compare_name(player_sorted);

  const addPlayer = (name) => {
    console.log("Let's add a new player with the name:", name);
    set_players((players) => [
      ...players,
      {
        id: players.length + 1,
        name: name,
        score: 0,
      },
    ]);
    console.log(players);
  };

  const player_sorted =
    sort_by === "score" ? players.sort(compare_score) : compare_name(players);

  return (
    <div className="Scoreboard">
      <p>Player's scores:</p>
      <p>
        Sort order:{" "}
        <select onChange={change_sorting} value={sort_by}>
          <option value="score">Sort by score</option>
          <option value="name">Sort by name</option>
        </select>
        <button onClick={resetScore}>Reset</button>
        <button onClick={randomizeScore}>Randomize</button>
      </p>
      <ul>
        {player_sorted.map((player) => (
          <li>
            <Player
              key={player.id}
              id={player.id}
              name={player.name}
              score={`(score: ${player.score})`}
              incrementScore={incrementScore}
            />
          </li>
        ))}
      </ul>
      <AddPlayerForm addPlayer={addPlayer} />
    </div>
  );
}
