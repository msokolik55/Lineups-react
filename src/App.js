import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Components
import Lineup from "./components/Lineup";
import Board from "./components/Board";

// Enums
const actions = {
	ADD: 0,
	EDIT: 1
};

function FormPlayer(props) {
	//#region FORM elements
	const fieldName = useRef(null);
	const fieldNumber = useRef(null);
	const fieldText = useRef(null);

	const addOptions = {
		SINGLE: 0,
		MULTI: 1
	};
	const [addOption, setAddOption] = useState(addOptions.SINGLE);
	const radioGroup = "addOption";
	const radioSingle = useRef(null);
	const radioMulti = useRef(null);
	//#endregion

	//#region useEffect

	// fill fields with player's data
	useEffect(() => {
		if (props.selectedPlayer === null || props.action === actions.ADD) {
			fieldNumber.current.value = "";
			fieldName.current.value = "";
			return;
		}

		let player = props.allPlayers.filter(
			(iplayer) => iplayer.id === props.selectedPlayer
		)[0];
		fieldNumber.current.value = player.number;
		fieldName.current.value = player.name;
	}, [props.selectedPlayer, props.allPlayers, props.action]);

	// enable fields when edit
	useEffect(() => {
		if (props.formPlayerShow && props.action === actions.EDIT)
			setAddOption(addOptions.SINGLE);
	}, [props.formPlayerShow, props.action, addOptions]);

	//#endregion

	//#region FORM handling
	const handleSingle = () => {
		let number = Number(fieldNumber.current.value);
		let name = fieldName.current.value;

		if (name.length > 0) {
			switch (props.action) {
				case actions.ADD: {
					props.setAllPlayers([
						...props.allPlayers,
						{
							id: props.allPlayers.length,
							number: number,
							name: name,
							lineup: 0,
							position: ""
						}
					]);
					break;
				}

				case actions.EDIT: {
					props.setAllPlayers(
						props.allPlayers.map((iplayer) => {
							if (iplayer.id === props.selectedPlayer) {
								return {
									...iplayer,
									number: number,
									name: name
								};
							}
							return iplayer;
						})
					);
					break;
				}

				default:
					break;
			}

			fieldName.current.value = "";
			fieldNumber.current.value = "";
			props.setFormPlayerShow(false);
			props.setSelectedPlayer(null);
		}
	};

	const handleMulti = () => {
		let text = fieldText.current.value;
		let rawPlayers = text.split("\n");
		let players = [];
		rawPlayers.map((iplayer) => {
			if (iplayer.length > 0) {
				let [number, surname] = iplayer.split("\t")[0].split(" ");
				players.push({
					id: players.length,
					number: number,
					name: surname,
					lineup: 0,
					position: ""
				});
			}
			return iplayer;
		});

		fieldName.current.value = "";
		fieldNumber.current.value = "";
		fieldText.current.value = "";
		props.setFormPlayerShow(false);
		props.setSelectedPlayer(null);
		props.setAllPlayers(players);
	};
	//#endregion

	return (
		<div
			className="container mw-100 form-container"
			style={{ display: props.formPlayerShow ? "block" : "none" }}>
			<div className="container form-content">
				<div className="row mb-3">
					<div className="col">
						<button
							className="btn btn-secondary"
							onClick={() => props.setFormPlayerShow(false)}>
							X
						</button>
					</div>
				</div>
				<div
					className="row"
					style={{ display: props.action === actions.ADD ? "block" : "none" }}>
					<div className="input-group mb-1">
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name={radioGroup}
								value="single"
								id="radioSingle"
								ref={radioSingle}
								checked={addOption === addOptions.SINGLE}
								onChange={() => setAddOption(addOptions.SINGLE)}
							/>
							<label className="form-check-label" htmlFor="radioSingle">
								1 hráč
							</label>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="input-group mb-1">
						<div className="input-group-prepend">
							<span className="input-group-text" id="player-number">
								#
							</span>
						</div>
						<input
							type="number"
							min="0"
							max="99"
							className="form-control"
							aria-label="Number"
							aria-describedby="player-number"
							ref={fieldNumber}
							disabled={addOption !== addOptions.SINGLE}
						/>
					</div>
				</div>

				<div className="row">
					<div className="input-group mb-1">
						<div className="input-group-prepend">
							<span className="input-group-text" id="player-name">
								Meno
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							aria-label="Name"
							aria-describedby="player-name"
							ref={fieldName}
							disabled={addOption !== addOptions.SINGLE}
						/>
					</div>
				</div>

				<div
					className="row"
					style={{ display: props.action === actions.ADD ? "block" : "none" }}>
					<div className="input-group mb-1">
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name={radioGroup}
								value="multi"
								id="radioMulti"
								ref={radioMulti}
								checked={addOption === addOptions.MULTI}
								onChange={() => setAddOption(addOptions.MULTI)}
							/>
							<label className="form-check-label" htmlFor="radioMulti">
								Viac hráčov
							</label>
						</div>
					</div>
				</div>

				<div
					className="row"
					style={{ display: props.action === actions.ADD ? "block" : "none" }}>
					<div className="input-group mb-1">
						<div className="input-group-prepend">
							<span className="input-group-text" id="player-name">
								Hráči [číslo" "priezvisko" "meno"\t"zvyšok]
							</span>
						</div>
						<textarea
							type="text"
							className="form-control"
							aria-label="Name"
							aria-describedby="player-name"
							ref={fieldText}
							disabled={addOption !== addOptions.MULTI}
						/>
					</div>
				</div>
				<button
					className="btn btn-secondary"
					onClick={() => {
						if (addOption === addOptions.SINGLE) {
							handleSingle();
							return;
						}
						handleMulti();
					}}>
					{props.action === actions.ADD && "+"}
					{props.action === actions.EDIT && "ULOŽ"}
				</button>
			</div>
		</div>
	);
}

function FormConfirm(props) {
	return (
		<div
			className="container mw-100 form-container"
			style={{ display: props.formConfirmShow ? "block" : "none" }}>
			<div className="container form-content">
				<button
					className="btn btn-secondary"
					onClick={() => {
						props.yesFunction();
						props.setFormConfirmShow(false);
					}}>
					Áno
				</button>
				<button
					className="btn btn-secondary"
					onClick={() => {
						props.noFunction();
						props.setFormConfirmShow(false);
					}}>
					Nie
				</button>
			</div>
		</div>
	);
}

function App() {
	const [allPlayers, setAllPlayers] = useState([]);
	const [lineups, setLineups] = useState([{ id: 0 }]);

	//#region idb-keyval
	const idbKeyval = require("idb-keyval");

	// get data from db
	useEffect(() => {
		idbKeyval.get("players").then((val) => {
			if (val === undefined) setAllPlayers([]);
			else setAllPlayers(val);
		});

		idbKeyval.get("lineups").then((val) => {
			if (val === undefined) setLineups([{ id: 0 }]);
			else setLineups(val);
		});
	}, [idbKeyval]);

	// update players in db
	useEffect(() => {
		idbKeyval.set("players", allPlayers);
	}, [allPlayers, idbKeyval]);

	// update lineups in db
	useEffect(() => {
		idbKeyval.set("lineups", lineups);
	}, [lineups, idbKeyval]);
	//#endregion

	const [updatedIDs, setUpdatedIDs] = useState(true);

	const addLineup = () => {
		setLineups(lineups.concat({ id: lineups.length }));
	};
	const deleteLineup = (id) => {
		setAllPlayers(
			allPlayers.map((iplayer) => {
				if (iplayer.lineup === id) {
					return { ...iplayer, lineup: 0, position: "" };
				}
				return iplayer;
			})
		);
		setLineups(lineups.filter((ilineup) => ilineup.id !== id));
		setUpdatedIDs(false);
	};
	const resetLineup = (id) => {
		setAllPlayers(
			allPlayers.map((iplayer) => {
				if (id === -1 || iplayer.lineup === id) {
					return { ...iplayer, lineup: 0, position: "" };
				}
				return iplayer;
			})
		);
		//setLineups(lineups.filter(ilineup => ilineup.id !== id));
		setUpdatedIDs(false);
	};

	const updateLineupsID = () => {
		if (!updatedIDs) {
			// changing lineup ID
			setLineups(
				lineups.map((ilineup, index) => {
					if (ilineup.id !== index) {
						// changing players lineup ID
						setAllPlayers(
							allPlayers.map((iplayer) => {
								if (iplayer.lineup === ilineup.id) {
									return { ...iplayer, lineup: index };
								}
								return iplayer;
							})
						);

						return { ...ilineup, id: index };
					}
					return ilineup;
				})
			);
		}
		setUpdatedIDs(true);
	};

	useEffect(() => {
		updateLineupsID();
		// eslint-disable-next-line
	}, [lineups]);

	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const deletePlayer = () => {
		setAllPlayers(allPlayers.filter((iplayer) => iplayer.id !== selectedPlayer));
		setSelectedPlayer(null);
	};

	const [formPlayerShow, setFormPlayerShow] = useState(false);
	const [action, setAction] = useState(actions.ADD);
	const [formConfirmShow, setFormConfirmShow] = useState(false);

	return (
		<div className="container-fluid">
			<div className="row text-center text-light my-2">
				<h1>Zostavy</h1>

				<div className="row">
					<div className="col text-end">
						<button className="btn btn-success btn-sm" onClick={addLineup}>
							<img alt="add" src={require("./images/add.png")} />
						</button>
						<button
							className="btn btn-warning btn-sm"
							onClick={() => resetLineup(-1)}>
							<img alt="reset" src={require("./images/reset.png")} />
						</button>
					</div>
				</div>
			</div>

			<div
				className="row mh-50 overflow-auto d-flex flex-column"
				style={{ height: "60vh" }}>
				{lineups.map((ilineup, index) => (
					<Lineup
						key={index}
						allPlayers={allPlayers}
						setAllPlayers={setAllPlayers}
						lineups={lineups}
						setLineups={setLineups}
						deleteLineup={deleteLineup}
						resetLineup={resetLineup}
						lineupID={index}
						lineupMax={lineups.length - 1}
						selectedPlayer={selectedPlayer}
						setSelectedPlayer={setSelectedPlayer}
					/>
				))}
			</div>

			<div className="row" style={{ display: "flex", alignItems: "center" }}>
				<div className="col text-center">
					<button
						className="btn btn-success btn-sm"
						onClick={() => {
							setAction(actions.ADD);
							setFormPlayerShow(true);
						}}>
						<img alt="add" src={require("./images/add.png")} />
					</button>
				</div>
				<div className="col text-center">
					<button
						className="btn btn-danger btn-sm"
						onClick={() => setFormConfirmShow(true)}>
						:(
					</button>
				</div>
				<div
					className={`col text-center ${
						selectedPlayer !== null ? "" : "hide"
					}`}>
					<button
						className="btn btn-warning btn-sm"
						onClick={() => {
							if (selectedPlayer !== null) {
								setAction(actions.EDIT);
								setFormPlayerShow(true);
							}
						}}>
						<img alt="edit" src={require("./images/reset.png")} />
					</button>
				</div>
				<div
					className={`col text-center ${
						selectedPlayer !== null ? "" : "hide"
					}`}>
					<button
						className="btn btn-danger btn-sm"
						onClick={() => deletePlayer()}>
						<img alt="delete" src={require("./images/delete.png")} />
					</button>
				</div>
			</div>

			<div className="row">
				<Board
					allPlayers={allPlayers}
					setAllPlayers={setAllPlayers}
					lineupID={0}
					title="Hraci"
					position=""
					selectedPlayer={selectedPlayer}
					setSelectedPlayer={setSelectedPlayer}
				/>
			</div>
			<FormConfirm
				formConfirmShow={formConfirmShow}
				setFormConfirmShow={setFormConfirmShow}
				yesFunction={() => setAllPlayers([])}
				noFunction={() => {}}
			/>

			<FormPlayer
				allPlayers={allPlayers}
				setAllPlayers={setAllPlayers}
				selectedPlayer={selectedPlayer}
				setSelectedPlayer={setSelectedPlayer}
				formPlayerShow={formPlayerShow}
				setFormPlayerShow={setFormPlayerShow}
				action={action}
			/>
		</div>
	);
}

export default App;
