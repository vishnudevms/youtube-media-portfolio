import './App.css';
import { Route,Routes } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Admin from './Components/Admin/Admin';
import EpisodesList from "./Components/Admin/EpisodesList";
import Gallery from './Components/Gallery';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
    {!isAdmin && <Navbar />}
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/admin/episodes" element={<EpisodesList />} />
      <Route path="/gallery" element={<Gallery/>}></Route>
    </Routes> 
    </>
  );
}
export default App;

