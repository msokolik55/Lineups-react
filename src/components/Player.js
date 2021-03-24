import React from 'react'

import { ItemTypes } from '../Constants'
import { useDrag } from 'react-dnd'

const Player = (props) => {
  
	const [{isDragging}, drag] = useDrag(() => ({
		type: ItemTypes.PLAYER,
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	}))

	//const dragStart = (e) => {
	//	const target = e.target;
	//	e.dataTransfer.setData('player_id', target.id);
	//}
//
	//const dragOver = (e) => {
	//	e.stopPropagation();
	//}

	return (
		<div
			id={props.player.id}
			className="col"
			ref={drag}
			//draggable
			//onDragStart={dragStart}
			//onDragOver={dragOver}
			>
			<div className="card">
				<div className="div-player-row">
					<div className="div-player-jersey">
						<h2>{props.player.number}</h2>
					</div>
				</div>

				<div className="card-row">
					<h4>{props.player.name}</h4>
				</div>
			</div>
    </div>
  )
}

export default Player;
