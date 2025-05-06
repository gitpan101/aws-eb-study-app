import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import './App.css';
import Login from './pages/Login';
import Todos from './pages/Todos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>

      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
}

export default App;
