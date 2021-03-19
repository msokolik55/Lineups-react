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
		<div id={`lineup-${lineupID}`} className="div-lineup">
			<div className="div-row div-nav">
				<h3>Zostava {lineupID + 1}</h3>
				<button onClick={resetThis} className={`${lineups.length > 1 ? "" : "hide"}`}>
					<img alt="reset" src={require('../images/reset.png')} />
				</button>
				<button onClick={deleteThis} className={`${lineups.length > 1 ? "" : "hide"}`}>
					<img alt="delete" src={require('../images/delete.png')} />
				</button>
			</div>

			<div className="div-lineup-boards">
				<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
					lineupID={lineupID} lineupMax={lineupMax}
					title="Brankari" position="goalkeeper" />

				<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
					lineupID={lineupID} lineupMax={lineupMax}
					title="Obrancovia" position="defender" />

				<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
					lineupID={lineupID} lineupMax={lineupMax}
					title="Utocnici" position="attacker" />

				<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
					lineupID={lineupID} lineupMax={lineupMax}
					title="Utocnici" position="attacker2" />

				<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
					lineupID={lineupID} lineupMax={lineupMax}
					title="Utocnici" position="attacker3" />
			</div>
		</div>
	)
}

export default Lineup;
