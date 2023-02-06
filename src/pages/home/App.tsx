import './App.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const App = () => {
  const nav = useNavigate();
  return (
    <div className="App">
      <h1>C R U D</h1>
      <Button onClick={() => nav('/login')}>Login</Button>
      <Button onClick={() => nav('/register')}>Cadastro</Button>
    </div>
  );
}
