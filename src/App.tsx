import { Outlet } from 'react-router-dom';
import './App.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
