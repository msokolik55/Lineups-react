import React, { useState } from 'react';
import './App.css';

// Components
import Lineup from './components/Lineup'
import Board from './components/Board'

function App() {
	const [allPlayers, setAllPlayers] = useState([
    { id: 0, name: "Michal", number: 5, lineup: 0, position: "" },
		{ id: 1, name: "Jozef", number: 9, lineup: 0, position: "" },
		{ id: 2, name: "Martin", number: 8, lineup: 0, position: "" },
		{ id: 3, name: "Peter", number: 6, lineup: 0, position: "" },
		{ id: 4, name: "Anton", number: 4, lineup: 0, position: "" },
		{ id: 5, name: "Vlado", number: 3, lineup: 0, position: "" },
		{ id: 6, name: "Roman", number: 1, lineup: 0, position: "" },
	])

	const [lineups, setLineups] = useState([
		{ id: 1 },
		{ id: 2 }
	]);

	const addLineup = () => {
		setLineups(lineups.concat({ id: lineups.length + 1 }));
	}
	const deleteLineup = () => {
		setAllPlayers(allPlayers.map(iplayer => {
			if (iplayer.lineup === lineups.length) {
				return { ...iplayer, lineup: 0, position: "" }
			}
			return iplayer;
		}));
		setLineups(lineups.filter(ilineup => ilineup.id !== lineups.length));
	}

  return (
		<div className="App">
			<header>
				<h1>Zostavy</h1>
			</header>

			<div className="wrapper">
					<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers} lineupID={0} title="Hraci" position="" />

					<div>
						<div className="div-nav">
							<button onClick={addLineup}>
								<img alt="add" src={require('./images/add.png')} />
							</button>
							<button onClick={deleteLineup} className={`${lineups.length > 1 ? "" : "hide"}`}>
								<img alt="delete" src={require('./images/delete.png')} />
							</button>
						</div>

						{
							lineups.map(lineup => (
								<Lineup key={lineup.id} allPlayers={allPlayers} setAllPlayers={setAllPlayers} lineupID={lineup.id} lineupMax={lineups.length} />
							))
						}
					</div>
			</div>
    </div>
  );
}

export default App;
