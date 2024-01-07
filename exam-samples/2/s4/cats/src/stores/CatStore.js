import { EventEmitter } from 'fbemitter'

class CatStore {
	constructor(){
		this.cats = [{
			id : 1,
			type : 'fine boi',
			name : 'Tim',
			mass : 20
		},
		{
			id : 2,
			type : 'A Heckin Chonker',
			name : 'Tom',
			mass : 40
		},	
		{
			id : 3,
			type : 'HEFTYCHONK',
			name : 'Catto',
			mass : 50
		}]
		this.emitter = new EventEmitter()
	}
	addCat(r){
		let maxId = this.cats.map((e) => e.id).reduce((a, e) => a > e ? a : e, 1)
		r.id = maxId + 1
		this.cats = [...this.cats, r]
		this.emitter.emit('UPDATE')
	}
	getCats(){
		return this.cats
	}
	deleteCat(id){
		let index = this.cats.findIndex((e) => e.id === id)
		if (index !== -1){
			this.cats.splice(index, 1)
		}
		this.emitter.emit('UPDATE')
	}
}

const store = new CatStore()

export default store