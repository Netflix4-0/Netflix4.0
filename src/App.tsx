import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './routes/Header';
import Home from './routes/Home';

function App() {
  return (
    <>
      <Header />
      <Home />
      <Outlet />
    </>
  );
}

export default App;
