import React, { useState } from 'react';

// Components
import Board from './Board'

const Lineup = (props) => {

	const deleteThis = () => props.deleteLineup(props.lineupID);
	const resetThis = () => props.resetLineup(props.lineupID);

	const options = {
		"2-1-2": [0, 1, 2, 3],
		"2-2-1": [1, 0, 2, 3],
	}

	const renderBoard = (title, positionName) => {
		return (
			<div className="col">
				<Board allPlayers={props.allPlayers} setAllPlayers={props.setAllPlayers}
					lineupID={props.lineupID} lineupMax={props.lineupMax}
					title={title} position={positionName}
					selectedPlayer={props.selectedPlayer} setSelectedPlayer={props.setSelectedPlayer} />
			</div>
		)
	}

	const boards = [
		<div className="row my-1">
			{renderBoard("L. utocnik", "position_1")}
			{renderBoard("P. utocnik", "position_2")}
		</div>,
		<div className="row my-1">
			{renderBoard("Center", "position_3")}
		</div>,
		<div className="row my-1">
			{renderBoard("L. obranca", "position_4")}
			{renderBoard("P. obranca", "position_5")}
		</div>,
		<div className="row my-1">
			{renderBoard("Brankar", "position_0")}
		</div>,
	]

	const [order, setOrder] = useState(options["2-1-2"]);
	const handleChange = (e) => setOrder(options[e.target.value])

	return (
		<div id={`lineup-${props.lineupID}`} className="mh-70 my-3 container bg-dark py-3">
			{/* #region Header */}
			<div className="container-fluid text-center text-light">
				<div className="row">
					<div className="col text-start">
						<h3>Zostava {props.lineupID + 1}</h3>						
					</div>
					<div className="col text-start">
						<label>Formácia:</label>
						<select name="formations" onChange={(e) => handleChange(e)}>
							{
								Object.entries(options).map(([key, _], i) => (									
									<option key={i} value={key}>{key}</option>
								))
							}
						</select>
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

			{/* #region Boards */}
			<div className="container-fluid">
				{boards[order[0]]}
				{boards[order[1]]}
				{boards[order[2]]}
				{boards[order[3]]}
			</div>
		</div>
	)
}

export default Lineup;
