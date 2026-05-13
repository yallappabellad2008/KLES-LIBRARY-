import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import UserPortal from './pages/UserPortal';
import EmployeePortal from './pages/EmployeePortal';
import AdminPortal from './pages/AdminPortal';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="user" element={<UserPortal />} />
        <Route path="employee" element={<EmployeePortal />} />
        <Route path="admin" element={<AdminPortal />} />
      </Route>
    </Routes>
  );
}
