
import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './Routes/CustomRoutes'

function App() {


  return (
   <div>
        <Link to='/' style={{textDecoration: 'none', color: 'black'}} >
          <h1>Pokedex</h1>
        </Link> 
  
      <CustomRoutes />
   </div>
  )
}

export default App
