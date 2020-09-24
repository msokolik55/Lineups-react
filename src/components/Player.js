import React from 'react'

const Player = (props) => {
	//const dragStart = (e) => {
	//	const target = e.target;
	//	e.dataTransfer.setData('player_id', target.id);
	//}

	//const dragOver = (e) => {
	//	e.stopPropagation();
	//}

	// alternating positions
	const moveToFree = () => {
		props.setAllPlayers(props.allPlayers.map((iplayer) => {
			if (iplayer.id === props.player.id) {
				return {
					...iplayer, lineup: 0, position: ""
				}
			}
			return iplayer;
		}));
	}
	const moveToGoalkeepers = () => {
		props.setAllPlayers(props.allPlayers.map((iplayer) => {
			if (iplayer.id === props.player.id) {
				return (iplayer.lineup === 0)
					? { ...iplayer, lineup: 1, position: "goalkeeper" }
					: { ...iplayer, position: "goalkeeper" }
			}
			return iplayer;
		}));
	}
	const moveToDefenders = () => {
		props.setAllPlayers(props.allPlayers.map((iplayer) => {
			if (iplayer.id === props.player.id) {
				return (iplayer.lineup === 0)
					? { ...iplayer, lineup: 1, position: "defender" }
					: { ...iplayer, position: "defender" }
				}
			return iplayer;
		}));
	}
	const moveToAttackers = () => {
		props.setAllPlayers(props.allPlayers.map((iplayer) => {
			if (iplayer.id === props.player.id) {
				return (iplayer.lineup === 0)
					? { ...iplayer, lineup: 1, position: "attacker" }
					: { ...iplayer, position: "attacker" }
			}
			return iplayer;
		}));
	}

	// alternating lineups
	const decreaseLineup = () => {
		props.setAllPlayers(props.allPlayers.map((iplayer) => {
			if (iplayer.id === props.player.id) {
				return { ...iplayer, lineup: iplayer.lineup - 1 }
			}
			return iplayer;
		}));
	}
	const increaseLineup = () => {
		props.setAllPlayers(props.allPlayers.map((iplayer) => {
			if (iplayer.id === props.player.id) {
				return { ...iplayer, lineup: iplayer.lineup + 1 }
			}
			return iplayer;
		}));
	}

	return (
		<div
			id={props.player.id}
			className="div-player"
			//draggable
			//onDragStart={dragStart}
			//onDragOver={dragOver}
			>

			<div className="div-player-jersey">
				<h3>{props.player.name}</h3>
				<h4>{props.player.number}</h4>
			</div>

			<div className="div-player-buttons">
				<button onClick={moveToFree}><img alt="free" src={require('../images/free.png')} /></button>
				<button onClick={moveToGoalkeepers}><img alt="gk" src={require('../images/goalkeeper.png')} /></button>
				<button onClick={moveToDefenders}><img alt="df" src={require('../images/defender.png')} /></button>
				<button onClick={moveToAttackers} > <img alt="at" src={require('../images/attacker.png')} /></button>
			</div>

			<div className="div-player-buttons">
				<button onClick={decreaseLineup} className={`${(props.player.lineup > 1) ? "" : "hide"}`}>
					<img alt="up" src={require('../images/up.png')} />
				</button>

				<button onClick={increaseLineup} className={`${(props.player.lineup < props.lineupMax && props.player.lineup > 0) ? "" : "hide"}`}>
					<img alt="down" src={require('../images/down.png')} />
				</button>
			</div>
    </div>
  )
}

export default Player;
