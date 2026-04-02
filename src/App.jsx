import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import NewOrder from './pages/NewOrder'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import Drafts from './pages/Drafts'
import Tracking from './pages/Tracking'
import Help from './pages/Help'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/new" element={<NewOrder />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/help" element={<Help />} />
      </Route>
    </Routes>
  )
}

export default App
