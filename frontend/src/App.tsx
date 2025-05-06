import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import './App.css';
import Login from './pages/Login';
import Todos from './pages/Todos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
}

export default App;
