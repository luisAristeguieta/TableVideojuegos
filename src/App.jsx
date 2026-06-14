import { useState } from 'react'
import TablaVideojuegos from './components/TablaVideojuegos';
import data from './data/videojuegos';
import './App.css'

function App() {
  // Estado para los videojuegos (usando los datos importados)
  const [videojuegos, setVideojuegos] = useState(data);

  return (
    <div className = "app" >
      <TablaVideojuegos videojuegos={videojuegos} />
    </div >
  )
}

export default App
