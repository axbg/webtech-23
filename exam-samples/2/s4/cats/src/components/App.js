import CatList from './CatList'
import chonkers from '../assets/chonkers.png'

function App () {
  return (
      <div>
      	<CatList />
        <br/>
        <img height="400px" width="400px" src={chonkers} /> 
      </div>
  )
}

export default App
