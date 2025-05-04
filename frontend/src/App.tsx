import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
      </Routes>

      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
}

export default App;
