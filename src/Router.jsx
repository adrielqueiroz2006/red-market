import { Route, Routes } from 'react-router-dom'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Customers } from './pages/Customers'
import { Products } from './pages/Products'
import { Orders } from './pages/Orders'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/clientes" element={<Customers />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/pedidos" element={<Orders />} />
    </Routes>
  )
}
