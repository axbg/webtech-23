import {useReducer, useEffect, useState } from 'react'
import store from '../stores/CatStore'
import Cat from './Cat'
import CatForm from './CatForm'

function CatList () {
	const [cats, setCats] = useState([])

	useEffect(() => {
		setCats(store.getCats())
		store.emitter.addListener('UPDATE', () => {
			setCats(store.getCats())
		})
	}, [])

		
	return (
		<div>		
			<CatForm/>
			<p>A list of cats</p>	 
			{
				cats.map((e, i) => 
					<Cat  item={e} key={i} />
				)
			}
		</div>
	)
}

export default CatList
