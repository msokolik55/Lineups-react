import React from "react";

// Components
import Player from "./Player";

import { ItemTypes } from '../Constants'
import { useDrop } from 'react-dnd'

const Board = (props) => {

	/* 
	const drop = (e) => {
		if (props.position !== "" && props.allPlayers
			.filter(player => player.lineup === props.lineupID &&
					player.position === props.position)
			.length >= 1)
					return;
		
		e.preventDefault();
		const player_id = e.dataTransfer.getData('player_id');

		//const player = document.getElementById(player_id);
		//player.style.display = 'block';
		//e.target.appendChild(player);

		props.setAllPlayers(
			props.allPlayers
				.map(iplayer => {
				if(iplayer.id === Number(player_id)) {
					return { ...iplayer, lineup: props.lineupID, position: props.position };
				}
				return iplayer;
			})
		)
	}

	const dragOver = (e) => {
		e.preventDefault();
	}
	*/

	const [{ isOver, player }, drop] = useDrop(() => ({
		accept: ItemTypes.PLAYER,
		drop: () => {
			console.log(player);
			
			if (props.position !== "" && props.allPlayers
				.filter(player => player.lineup === props.lineupID &&
						player.position === props.position)
				.length >= 1)
						return;
			
			//const player_id = e.dataTransfer.getData('player_id');

			props.setAllPlayers(
				props.allPlayers
					.map(iplayer => {
					//if(iplayer.id === Number(player_id)) {
					//	return { ...iplayer, lineup: props.lineupID, position: props.position };
					//}
					return iplayer;
					})
			)

		},
		collect: monitor => ({
			isOver: !!monitor.isOver(),
			player: monitor.getItem(),
		}),
	}))

	return (

		<div
			id={props.title}
			className={"container text-center"}
			ref={drop}
			/* onDrop={drop}
			onDragOver={dragOver} */
			>

			<div className="row bg-primary text-light p-2">
				<h3 className="mb-0">{props.title}</h3>
			</div>
			<div className="row bg-light">
				<div className="card-group flex-nowrap overflow-auto">
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
		</div>
	)
}

export default Board;
