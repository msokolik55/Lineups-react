import React from 'react';

// Components
import Board from './Board'

const Lineup = (props) => {

	const deleteThis = () => props.deleteLineup(props.lineupID);
	const resetThis = () => props.resetLineup(props.lineupID);

	return (
		<div id={`lineup-${props.lineupID}`} className="mh-70 my-3 container bg-dark py-3">
			<div className="container-fluid text-center text-light">
				<div className="row">
					<div className="col text-start">
						<h3>Zostava {props.lineupID + 1}</h3>
					</div>
					<div className="col text-end">
					<button
						className="btn btn-warning btn-sm"
						onClick={resetThis}>
						<img alt="reset" src={require('../images/reset.png')} />
					</button>
					<button
						onClick={deleteThis} className={`btn btn-danger btn-sm ${props.lineups.length > 1 ? "" : "hide"}`}>
						<img alt="delete" src={require('../images/delete.png')} />
					</button>
					</div>
				</div>
			</div>

			<div className="container-fluid">				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
							lineupID={props.lineupID} lineupMax={props.lineupMax}
							title="L. utocnik" position="left-attacker"
							selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
					</div>
					<div className="col">
						<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
							lineupID={props.lineupID} lineupMax={props.lineupMax}
							title="P. utocnik" position="right-attacker"
							selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
					</div>
				</div>
				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
							lineupID={props.lineupID} lineupMax={props.lineupMax}
							title="Center" position="center"
							selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
					</div>
				</div>
				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
							lineupID={props.lineupID} lineupMax={props.lineupMax}
							title="L. obranca" position="left-defender"
							selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
					</div>

					<div className="col">
						<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
							lineupID={props.lineupID} lineupMax={props.lineupMax}
							title="P. obranca" position="right-defender"
							selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
					</div>
				</div>
				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
							lineupID={props.lineupID} lineupMax={props.lineupMax}
							title="Brankar" position="goalkeeper"
							selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Lineup;
