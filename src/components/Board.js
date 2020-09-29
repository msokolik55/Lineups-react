import React from "react";

// Components
import Player from "./Player";

const Board = (props) => {

	const drop = (e) => {
		e.preventDefault();
		const player_id = e.dataTransfer.getData('player_id');

		//const player = document.getElementById(player_id);
		//player.style.display = 'block';
		//e.target.appendChild(player);

		props.setAllPlayers(props.allPlayers.map(iplayer => {
			if(iplayer.id === Number(player_id)) {
				return { ...iplayer, lineup: props.lineupID, position: props.position };
			}
			return iplayer;
		}
		))
	}

	const dragOver = (e) => {
		e.preventDefault();
	}

	return (

		<div
			id={props.title}
			className={`div-board ${props.position !== "" ? "div-board-lineup" : ""}`}
			onDrop={drop}
			onDragOver={dragOver}
		>

			<div className="div-board-title">
				<h3>{props.title}</h3>
			</div>
			<div className="div-board-players">
			{
					props.allPlayers
						.filter(player => player.lineup === props.lineupID && player.position === props.position)
						.map((player) => (
							<Player
								id={player.number}
								key={player.number}
								player={player}
								allPlayers={props.allPlayers}
								setAllPlayers={props.setAllPlayers}
								lineupMax={props.lineupMax}/>
						)
						)
			}
			</div>
		</div>
	)
}

export default Board;
