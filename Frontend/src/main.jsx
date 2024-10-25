import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TransitionTable from './components/Table/transitionTable';
import StatisticsCard from './components/Stats/Statistics';
import TinyBarChart from './components/bar/bar';
const router = createBrowserRouter([
  
    {path: "/",
    element: <TransitionTable/>,
   },

      {
        path: "/stats",
        element: <StatisticsCard />,
    
      },
      {
        path: "/bar",
        element: <TinyBarChart />,
     
      },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>


  </StrictMode>,
)


