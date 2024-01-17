import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Signup } from './pages/signup'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}
