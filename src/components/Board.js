import React from "react";

// Components
import Player from "./Player";

const Board = (props) => {

	//const drop = (e) => {
	//	e.preventDefault();

	//	const player_id = e.dataTransfer.getData('player_id');
	//	const player = document.getElementById(player_id);
	//	player.style.display = 'block';

	//	e.target.appendChild(player);
	//}

	//const dragOver = (e) => {
	//	e.preventDefault();
	//}

	return (
		<div
			//id={props.title}
			className={`div-board ${props.position !== "" ? "div-board-lineup" : ""}`}
			//onDrop={drop}
			//onDragOver={dragOver}
		>

		<h3>{props.title}</h3>
		{
				props.allPlayers
					.filter(player => player.lineup === props.lineupID && player.position === props.position)
					.map((player) => (
						<Player
							//id={player.number}
							key={player.number}
							player={player}
							allPlayers={props.allPlayers}
							setAllPlayers={props.setAllPlayers}
							lineupMax={props.lineupMax}/>
					)
					)
		}
		</div>
	)
}

export default Board;