import React from 'react';

// Components
import Board from './Board'

const Lineup = ({
		allPlayers, setAllPlayers,
		lineups, setLineups, deleteLineup, resetLineup,
		lineupID, lineupMax
	}) => {

	const deleteThis = () => deleteLineup(lineupID);
	const resetThis = () => resetLineup(lineupID);

	return (
		<div id={`lineup-${lineupID}`} className="mh-70 my-3 container bg-dark py-3">
			<div className="container-fluid text-center text-light">
				<div className="row">
					<div className="col text-start">
						<h3>Zostava {lineupID + 1}</h3>
					</div>
					<div className="col text-end">
					<button
						className="btn btn-warning btn-sm"
						onClick={resetThis}>
						<img alt="reset" src={require('../images/reset.png')} />
					</button>
					<button
						onClick={deleteThis} className={`btn btn-danger btn-sm ${lineups.length > 1 ? "" : "hide"}`}>
						<img alt="delete" src={require('../images/delete.png')} />
					</button>
					</div>
				</div>
			</div>

			<div className="container-fluid">				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={lineupID} lineupMax={lineupMax}
							title="L. utocnik" position="left-attacker" />
					</div>
					<div className="col">
						<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={lineupID} lineupMax={lineupMax}
							title="P. utocnik" position="right-attacker" />
					</div>
				</div>
				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={lineupID} lineupMax={lineupMax}
							title="Center" position="center" />
					</div>
				</div>
				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={lineupID} lineupMax={lineupMax}
							title="L. obranca" position="left-defender" />
					</div>

					<div className="col">
						<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={lineupID} lineupMax={lineupMax}
							title="P. obranca" position="right-defender" />
					</div>
				</div>
				
				<div className="row my-1">
					<div className="col">
						<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={lineupID} lineupMax={lineupMax}
							title="Brankar" position="goalkeeper" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Lineup;
