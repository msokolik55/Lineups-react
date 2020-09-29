import React, { useState, useEffect } from 'react';
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
		{ id: 0 },
		{ id: 1 }
	]);
	const [updatedIDs, setUpdatedIDs] = useState(true);

	const addLineup = () => {
		setLineups(lineups.concat({ id: lineups.length }));
	}
	const deleteLineup = (id) => {
		setAllPlayers(allPlayers.map(iplayer => {
			if (iplayer.lineup === id) {
				return { ...iplayer, lineup: 0, position: "" }
			}
			return iplayer;
		}));
		setLineups(lineups.filter(ilineup => ilineup.id !== id));
		setUpdatedIDs(false);
	}

	const updateLineupsID = () => {
		if(!updatedIDs) {
			// changing lineup ID
			setLineups(lineups.map((ilineup, index) => {
				if(ilineup.id !== index) {

					// changing players lineup ID
					setAllPlayers(allPlayers.map(iplayer => {
						if(iplayer.lineup === ilineup.id) {
							return { ...iplayer, lineup: index };
						}
						return iplayer;
					}));

					return { ...ilineup, id: index };
				}
				return ilineup;
			}))
		}
		setUpdatedIDs(true);
	}

	useEffect(() => {
		updateLineupsID();
	}, [lineups])

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
						{
						//	<button onClick={deleteLineup} className={`${lineups.length > 1 ? "" : "hide"}`}>
						//		<img alt="delete" src={require('./images/delete.png')} />
						//	</button>
						}
						</div>

						{
							lineups.map((ilineup, index) => (
								<Lineup key={index} allPlayers={allPlayers} setAllPlayers={setAllPlayers}
																		lineups={lineups} setLineups={setLineups} deleteLineup={deleteLineup}
																		lineupID={index} lineupMax={lineups.length - 1} />
							))
						}
					</div>
			</div>
    </div>
  );
}

export default App;
