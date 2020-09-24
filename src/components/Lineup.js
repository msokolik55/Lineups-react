import React from 'react';

// Components
import Board from './Board'

const Lineup = ({ allPlayers, setAllPlayers, lineupID, lineupMax }) => {
	return (
		<div className="div-lineup">
			<h3>Line up {lineupID}</h3>

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
			</div>
		</div>
	)
}

export default Lineup;