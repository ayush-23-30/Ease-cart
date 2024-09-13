
import './App.css'
import { Outlet } from 'react-router-dom'
import MainHeader from './component/MainHeader'


function App() {
  return (
 <div className="  ">
  <MainHeader></MainHeader>
  <Outlet></Outlet>
 </div>
  )
}

export default App
