// src/components/Player.js

export default function Player(props) {
  // the event listener callback
  const onClickIncrement = () => {
    // call the callback prop passed down from the scoreboard
    props.incrementScore(props.id);
    console.log(props.id);
  };

  return (
    <li className="Player">
      <div
        className="percentage_coloring"
        style={{ width: props.score + "%" }}
      />
      <p>
        {props.id} {props.name} {props.score}
        <button onClick={onClickIncrement}>increment</button>
      </p>
    </li>
  );
}
