import React, { useState, useEffect, useRef } from 'react';
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
	const resetLineup = (id) => {
		setAllPlayers(allPlayers.map(iplayer => {
			if (id === -1 || iplayer.lineup === id) {
				return { ...iplayer, lineup: 0, position: "" }
			}
			return iplayer;
		}));
		//setLineups(lineups.filter(ilineup => ilineup.id !== id));
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
		// eslint-disable-next-line
	}, [lineups])

	//#region MYSQL
	// function FetchItems(command) {
	// 	console.log(command)

	// 	fetch('http://www.sokos.sk/florbaldca2/servis/function/database_rn.php', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({            
	// 			command: command,
	// 		})
	// 	})
	// 	.then(response => response.json())
	// 		.then(responseJSON => {
	// 			//console.log(responseJSON);
	// 			let tmp = [];
	// 			responseJSON.map(obj => tmp.push({
	// 				id: obj.id,
	// 				name: obj.name,
	// 				number: obj.id,
	// 				lineup: 0,
	// 				position: "",
	// 				selected: false,
	// 			}));
	// 			//console.log(responseJSON);
	// 			setAllPlayers(tmp);
	// 		})
	// 	.catch(err => {
	// 		console.log("Failure: " + err);
	// 	})
	// }

	// const comm = "SELECT nID AS number, nID AS id, sName AS name, sLastName" +
	// 			 " FROM ssfb_vsplayers" +
	// 			 " WHERE nIDSeason='8' AND nIDVSTeam='1'" +
	// 			 " LIMIT 20";
	//#endregion

	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const deletePlayer = () => {
		setAllPlayers(allPlayers.filter(iplayer => iplayer.id !== selectedPlayer));
		setSelectedPlayer(null);
	}

	const [menuAddPlayer, setMenuAddPlayer] = useState(false);
	const playerAddName = useRef(null);
	const playerAddNumber = useRef(null);
	
	const [menuEditPlayer, setMenuEditPlayer] = useState(false);
	const playerEditName = useRef(null);
	const playerEditNumber = useRef(null);	

	return (
		<div className="container-fluid">
			<div className="row text-center text-light">
				<h1>Zostavy</h1>
				
				<div className="row">
					{/* <div className="col">
						<button
							className="btn btn-outline-light"
							onClick={() => FetchItems(comm)}
							>
							Fetch from DB
						</button>
					</div> */}
					<div className="col text-end">
						<button
							className="btn btn-success btn-sm"
							onClick={addLineup}>
							<img alt="add" src={require('./images/add.png')} />
						</button>
						<button
							className="btn btn-warning btn-sm"
							onClick={() => resetLineup(-1)}>
							<img alt="reset" src={require('./images/reset.png')} />
						</button>
					</div>
				</div>
			</div>
			
			<div className="row mh-50 overflow-auto" style={{height: "63vh"}}>
			{
				lineups.map((ilineup, index) => (
					<Lineup key={index} allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineups={lineups} setLineups={setLineups} deleteLineup={deleteLineup} resetLineup={resetLineup}
							lineupID={index} lineupMax={lineups.length - 1}
							selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
				))
			}
			</div>

			<div className="row">
				<div className="col-11">
					<Board allPlayers={allPlayers} setAllPlayers={setAllPlayers}
							lineupID={0}
							title="Hraci" position=""
							selectedPlayer={selectedPlayer} setSelectedPlayer={setSelectedPlayer} />
				</div>
				<div className="col-1" style={{ display: 'flex', alignItems: 'center' }}>
					<div className="container">
						<div className="row">
							<div className="col">
								<button className="btn btn-success btn-sm" onClick={() => setMenuAddPlayer(true)}>
									<img alt="add" src={require('./images/add.png')} />
								</button>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<button className="btn btn-warning btn-sm" onClick={() => {
									if (selectedPlayer !== null) {
										let player = allPlayers.filter(iplayer => iplayer.id === selectedPlayer)[0];
										playerEditNumber.current.value = player.number;
										playerEditName.current.value = player.name;
										setMenuEditPlayer(true);										
									}
									}}>
									<img alt="edit" src={require('./images/reset.png')} />
								</button>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<button className="btn btn-danger btn-sm" onClick={() => deletePlayer()}>
									<img alt="delete" src={require('./images/delete.png')} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{//#region MENU Add player
			}
			<div className="container mw-100" style={{
					position: 'fixed',
					backgroundColor: "hsl(0deg 0% 100% / 50%)",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					zIndex: 1,
					display: menuAddPlayer ? 'block' : 'none',
			 	}}>
				<div className="container" style={{
					backgroundColor: 'red',
					marginTop: '1rem',
					height: '90%',
					zIndex: 1,
					}}>
					<div className="row mb-3">
						<div className="col">
							<button className="btn btn-secondary" onClick={() => setMenuAddPlayer(false)}>X</button>
						</div>
					</div>
					<div className="row">
						<div className="input-group mb-1">
							<div className="input-group-prepend">
								<span className="input-group-text" id="player-number">#</span>
							</div>
							<input type="number" min="0" max="99"
								className="form-control"
								aria-label="Number"
								aria-describedby="player-number"
								ref={playerAddNumber}
								/>
						</div>
					</div>
					<div className="row">
						<div className="input-group mb-1">
							<div className="input-group-prepend">
								<span className="input-group-text" id="player-name">Meno</span>
							</div>
							<input type="text"
								className="form-control"
								aria-label="Name"
								aria-describedby="player-name"
								ref={playerAddName}
								/>
						</div>
					</div>
					<button className="btn btn-secondary" onClick={() => {
						let number = Number(playerAddNumber.current.value);
						let name = playerAddName.current.value;
						
						if (name.length > 0)
						{
							setAllPlayers([...allPlayers, {
								id: allPlayers.length, number: number, name: name, lineup: 0, position: ""
							}]);
							playerAddName.current.value = "";
							playerAddNumber.current.value = "";
							setMenuAddPlayer(false);
						}
						}}>+</button>
				</div>
			</div>
			
			{//#region MENU Edit player
			}
			<div className="container mw-100" style={{
					position: 'fixed',
					backgroundColor: "hsl(0deg 0% 100% / 50%)",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					zIndex: 1,
					display: menuEditPlayer ? 'block' : 'none',
			 	}}>
				<div className="container" style={{
					backgroundColor: 'red',
					marginTop: '1rem',
					height: '90%',
					zIndex: 1,
					}}>
					<div className="row mb-3">
						<div className="col">
							<button className="btn btn-secondary" onClick={() => setMenuEditPlayer(false)}>X</button>
						</div>
					</div>
					<div className="row">
						<div className="input-group mb-1">
							<div className="input-group-prepend">
								<span className="input-group-text" id="player-number">#</span>
							</div>
							<input type="number" min="0" max="99"
								className="form-control"
								aria-label="Number"
								aria-describedby="player-number"
								ref={playerEditNumber}
								/>
						</div>
					</div>
					<div className="row">
						<div className="input-group mb-1">
							<div className="input-group-prepend">
								<span className="input-group-text" id="player-name">Meno</span>
							</div>
							<input type="text"
								className="form-control"
								aria-label="Name"
								aria-describedby="player-name"
								ref={playerEditName}
								/>
						</div>
					</div>
					<button className="btn btn-secondary" onClick={() => {
						let number = Number(playerEditNumber.current.value);
						let name = playerEditName.current.value;
						
						if (name.length > 0)
						{
							setAllPlayers(allPlayers.map((iplayer) => {
								if (iplayer.id === selectedPlayer) {
									return { ...iplayer, number: number, name: name };
								}
								return iplayer;
							}));
							setMenuEditPlayer(false);
							setSelectedPlayer(null);
						}
						}}>Ulož</button>
				</div>
			</div>
		</div>
	);
}

export default App;
