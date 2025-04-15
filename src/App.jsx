import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='min-h-[85vh]'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
