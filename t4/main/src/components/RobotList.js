import { useState, useEffect } from 'react'
import store from '../stores/RobotStore'
import Robot from './Robot'
import RobotForm from './RobotForm'

function RobotList () {
	const [robots, setRobots] = useState([])

	useEffect(() => {
		setRobots(store.getRobots())
		store.emitter.addEventListener('UPDATE', () => {
			setRobots([...store.getRobots()])
		})
	}, [])

	const add = (item) => {
		store.addRobot(item)
	}

	return (
		<div>	 
			<div>
				{
					robots.map((e, i) => 
						<Robot item={e} key={i} />
					)
				}
			</div>
			<RobotForm onAdd={add} />
		</div>
	)
}

export default RobotList
