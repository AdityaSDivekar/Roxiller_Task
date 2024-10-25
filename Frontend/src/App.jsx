
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import TinyBarChart from './components/bar/bar'
import StatisticsCard from './components/Stats/Statistics'
import TransitionTable from './components/Table/TransitionTable'
import { Route } from 'lucide-react'
function App() {

  return (
   <>
   
   
    <TransitionTable/>
   <StatisticsCard/>
   <TinyBarChart/>
  
   </>
  )
}

export default App
