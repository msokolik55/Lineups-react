import React from "react";

// Components
import Player from "./Player";

const Board = (props) => {

	const drop = (e) => {
		e.preventDefault();
		
		let playersOnBoard = props.allPlayers
			.filter(player => player.lineup === props.lineupID &&
							  player.position === props.position);		
							  
		const player_id = e.dataTransfer.getData('player_id');
		let playerToMove = props.allPlayers.filter(iplayer => iplayer.id === Number(player_id))[0];

		props.setAllPlayers(props.allPlayers
			.map(iplayer => {
				if(playersOnBoard.length >= 1 &&
					iplayer.id === playersOnBoard[0].id &&
					props.position !== "") {
					return { ...iplayer, lineup: playerToMove.lineup, position: playerToMove.position };						
				}					

				if(iplayer.id === Number(player_id)) {
					return { ...iplayer, lineup: props.lineupID, position: props.position };
				}
				
				return iplayer;
			})
		)
		
		props.setSelectedPlayer(null);

	}

	const dragOver = (e) => {
		e.preventDefault();
	}

	const clickHandle = () => {
		if (props.selectedPlayer === null) return;

		let playersOnBoard = props.allPlayers
			.filter(player => player.lineup === props.lineupID &&
							  player.position === props.position);
		
		let playerToMove = props.allPlayers.filter(iplayer => iplayer.id === props.selectedPlayer)[0];
		
		props.setAllPlayers(props.allPlayers
			.map(iplayer => {
				if(playersOnBoard.length >= 1 &&
					iplayer.id === playersOnBoard[0].id &&
					props.position !== "") {
					return { ...iplayer, lineup: playerToMove.lineup, position: playerToMove.position };						
				}
					

				if(iplayer.id === props.selectedPlayer) {
					return { ...iplayer, lineup: props.lineupID, position: props.position };
				}
				
				return iplayer;
			})
		)
		
		props.setSelectedPlayer(null);
	}

	return (

		<div
			id={props.title}
			className={"container text-center"}
			onDrop={drop}
			onDragOver={dragOver}
			onClick={clickHandle}
			>

			<div className="row bg-primary text-light p-2" style={{ pointerEvents: 'none' }}>
				<h3 className="mb-0">{props.title}</h3>
			</div>
			<div className="row bg-light" style={{ pointerEvents: 'none' }}>
				<div className="card-group flex-nowrap overflow-auto">
				{
						props.allPlayers
							.filter(player => player.lineup === props.lineupID && player.position === props.position)
							.map((player) => (
								<Player
									id={player.id}
									key={player.id}
									player={player}
									allPlayers={props.allPlayers}
									setAllPlayers={props.setAllPlayers}
									lineupMax={props.lineupMax}
									selectedPlayer={props.selectedPlayer}
									setSelectedPlayer={props.setSelectedPlayer}
									/>
							)
							)
				}
				</div>
			</div>
		</div>
	)
}

export default Board;
