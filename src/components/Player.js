import React from "react";

const Player = (props) => {
	const dragStart = (e) => {
		const target = e.target;
		e.dataTransfer.setData("player_id", target.id);
	};

	const dragOver = (e) => {
		e.stopPropagation();
	};

	const handleClick = (e) => {
		const target = e.target;
		props.setSelectedPlayer(Number(target.id));
	};

	return (
		<div
			id={props.player.id}
			className="col"
			draggable
			onDragStart={dragStart}
			onDragOver={dragOver}
			onClick={handleClick}
			style={{ pointerEvents: "visible" }}>
			<div
				className="card"
				style={{
					pointerEvents: "none",
					backgroundColor: props.player.id === props.selectedPlayer ? "red" : ""
				}}>
				<div className="div-player-row">
					<div className="div-player-jersey">
						<h5>{props.player.number}</h5>
					</div>
				</div>

				<div className="card-row">
					<p>{props.player.name}</p>
				</div>
			</div>
		</div>
	);
};

export default Player;
