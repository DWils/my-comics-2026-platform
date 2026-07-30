import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import './App.css';

// Les routes /login, /register et /users/:id seront ajoutées dans les
// modules 9.3 (auth) et 9.4 (CRUD utilisateur).
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
